import json
import mimetypes
import subprocess
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

LAUNCHER_HOST = "127.0.0.1"
LAUNCHER_PORT = 8790
DEFAULT_BACKEND_URL = "http://127.0.0.1:8787"

BASE_DIR = Path(__file__).resolve().parent
APP_ROOT = BASE_DIR.parent
BACKEND_DIR = BASE_DIR.parent / "backend"
LOG_PATH = BASE_DIR / "backend.log"

_state_lock = threading.Lock()
_backend_process: subprocess.Popen | None = None
_backend_log_file = None
_backend_url = DEFAULT_BACKEND_URL
_last_error = ""


def _json_response(handler: BaseHTTPRequestHandler, status: int, payload: dict[str, Any]) -> None:
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    handler.send_header("Access-Control-Allow-Private-Network", "true")
    handler.send_header("Access-Control-Max-Age", "600")
    handler.end_headers()
    handler.wfile.write(body)


def _read_json_body(handler: BaseHTTPRequestHandler) -> dict[str, Any]:
    content_length = int(handler.headers.get("Content-Length", "0") or "0")
    if content_length <= 0:
        return {}
    raw = handler.rfile.read(content_length)
    if not raw:
        return {}
    try:
        parsed = json.loads(raw.decode("utf-8"))
        return parsed if isinstance(parsed, dict) else {}
    except json.JSONDecodeError:
        return {}


def _serve_static_file(handler: BaseHTTPRequestHandler, request_path: str) -> None:
    clean_path = str(request_path or "/").split("?", 1)[0].split("#", 1)[0]
    if clean_path in ("/", "/index.html"):
        clean_path = "/dfir-checklist.html"

    relative = clean_path.lstrip("/")
    file_path = (APP_ROOT / relative).resolve()

    try:
        file_path.relative_to(APP_ROOT.resolve())
    except ValueError:
        _json_response(handler, 403, {"ok": False, "error": "Forbidden"})
        return

    if not file_path.exists() or not file_path.is_file():
        _json_response(handler, 404, {"ok": False, "error": "Not found"})
        return

    mime_type, _ = mimetypes.guess_type(str(file_path))
    data = file_path.read_bytes()

    handler.send_response(200)
    handler.send_header("Content-Type", mime_type or "application/octet-stream")
    handler.send_header("Content-Length", str(len(data)))
    handler.end_headers()
    handler.wfile.write(data)


def _is_backend_running() -> bool:
    return _backend_process is not None and _backend_process.poll() is None


def _backend_python() -> str:
    venv_python = BACKEND_DIR / ".venv" / "bin" / "python"
    if venv_python.exists():
        return str(venv_python)
    return sys.executable


def _parse_backend_url(url: str) -> tuple[str, int, str]:
    text = str(url or "").strip() or DEFAULT_BACKEND_URL
    parsed = urlparse(text)
    if not parsed.scheme:
        parsed = urlparse(f"http://{text}")

    host = parsed.hostname or "127.0.0.1"
    port = parsed.port or 8787
    normalized = f"http://{host}:{port}"
    return host, port, normalized


def _status_payload(message: str = "") -> dict[str, Any]:
    return {
        "ok": True,
        "message": message,
        "running": _is_backend_running(),
        "pid": _backend_process.pid if _is_backend_running() else None,
        "backend_url": _backend_url,
        "last_error": _last_error,
    }


def _start_backend(url: str) -> dict[str, Any]:
    global _backend_process, _backend_log_file, _backend_url, _last_error

    with _state_lock:
        if _is_backend_running():
            return _status_payload("Backend already running.")

        host, port, normalized_url = _parse_backend_url(url)
        _backend_url = normalized_url
        _last_error = ""

        command = [
            _backend_python(),
            "-m",
            "uvicorn",
            "main:app",
            "--host",
            host,
            "--port",
            str(port),
        ]

        try:
            BACKEND_DIR.mkdir(parents=True, exist_ok=True)
            _backend_log_file = LOG_PATH.open("a", encoding="utf-8")
            _backend_process = subprocess.Popen(
                command,
                cwd=str(BACKEND_DIR),
                stdout=_backend_log_file,
                stderr=subprocess.STDOUT,
            )
            return _status_payload("Backend start requested.")
        except OSError as exc:
            _last_error = f"Failed to start backend: {exc}"
            _backend_process = None
            if _backend_log_file:
                _backend_log_file.close()
                _backend_log_file = None
            return _status_payload(_last_error)


def _stop_backend() -> dict[str, Any]:
    global _backend_process, _backend_log_file

    with _state_lock:
        if _is_backend_running():
            _backend_process.terminate()
            try:
                _backend_process.wait(timeout=8)
            except subprocess.TimeoutExpired:
                _backend_process.kill()

        _backend_process = None

        if _backend_log_file:
            _backend_log_file.close()
            _backend_log_file = None

        return _status_payload("Backend stop requested.")


class LauncherHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self) -> None:
        _json_response(self, 200, {"ok": True})

    def do_GET(self) -> None:
        request_path = urlparse(self.path).path

        if request_path == "/api/launcher/health":
            _json_response(self, 200, {"ok": True, "service": "dfir-launcher"})
            return

        if request_path == "/api/launcher/status":
            _json_response(self, 200, _status_payload("Launcher online."))
            return

        _serve_static_file(self, request_path)

    def do_POST(self) -> None:
        request_path = urlparse(self.path).path
        payload = _read_json_body(self)

        if request_path == "/api/launcher/start":
            backend_url = str(payload.get("backend_url") or DEFAULT_BACKEND_URL)
            _json_response(self, 200, _start_backend(backend_url))
            return

        if request_path == "/api/launcher/stop":
            _json_response(self, 200, _stop_backend())
            return

        _json_response(self, 404, {"ok": False, "error": "Not found"})

    def log_message(self, format: str, *args: Any) -> None:
        return


def run() -> None:
    server = ThreadingHTTPServer((LAUNCHER_HOST, LAUNCHER_PORT), LauncherHandler)
    print(f"DFIR launcher running at http://{LAUNCHER_HOST}:{LAUNCHER_PORT}")
    server.serve_forever()


if __name__ == "__main__":
    run()
