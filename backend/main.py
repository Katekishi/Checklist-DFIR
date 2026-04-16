import json
import os
import re
import select
import queue
import shlex
import subprocess
import threading
import time
from dataclasses import dataclass, field
from typing import Any
from urllib.parse import urlparse

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field


@dataclass
class SessionState:
    active: bool = False
    model: str = ""
    model_instance_id: str = ""
    model_loaded: bool = False
    lmstudio_base_url: str = "http://127.0.0.1:1234/v1"
    context_length: int = 0
    idle_timeout_minutes: int = 20
    mcp_command: str = ""
    mcp_args: list[str] = field(default_factory=list)
    mcp_process: subprocess.Popen | None = None
    mcp_initialized: bool = False
    mcp_request_id: int = 0
    mcp_io_lock: Any = field(default_factory=threading.Lock, repr=False)
    mcp_last_error: str = ""
    mcp_transport: str = "content-length"
    last_activity_ts: float = 0.0
    analysis_cancel_requested: bool = False


session = SessionState()


LMSTUDIO_CONNECT_TIMEOUT_SECONDS = float(os.getenv("LMSTUDIO_CONNECT_TIMEOUT_SECONDS", "15"))
LMSTUDIO_READ_TIMEOUT_SECONDS = float(os.getenv("LMSTUDIO_READ_TIMEOUT_SECONDS", "600"))
MCP_REQUEST_TIMEOUT_SECONDS = float(os.getenv("MCP_REQUEST_TIMEOUT_SECONDS", "180"))
MCP_INITIALIZE_TIMEOUT_SECONDS = float(os.getenv("MCP_INITIALIZE_TIMEOUT_SECONDS", "180"))
MCP_TOOL_TIMEOUT_SECONDS = float(os.getenv("MCP_TOOL_TIMEOUT_SECONDS", "600"))
MCP_INIT_PROBE_TIMEOUT_SECONDS = float(os.getenv("MCP_INIT_PROBE_TIMEOUT_SECONDS", "12"))


app = FastAPI(title="DFIR AI Bridge", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SessionStartRequest(BaseModel):
    lmstudio_base_url: str = Field(default="http://127.0.0.1:1234/v1")
    model: str
    context_length: int = Field(default=0, ge=0, le=262144)
    idle_timeout_minutes: int = Field(default=20, ge=1, le=240)
    mcp_command: str = Field(default="")
    mcp_args: list[str] = Field(default_factory=list)


class AnalyzeRequest(BaseModel):
    evidence_path: str
    execution_target: str = ""
    ioc: str = ""
    mcp_orders: str = ""
    artifacts: list[dict[str, Any]] = Field(default_factory=list)
    selected_artifacts: list[str] = Field(default_factory=list)
    thinking_mode: str = "enabled"
    response_mode: str = "checklist"
    chat_history: list[dict[str, str]] = Field(default_factory=list)
    system_prompt_override: str = ""
    user_prompt_override: str = ""


def normalize_response_mode(mode: str) -> str:
    return "chat" if str(mode or "").strip().lower() == "chat" else "checklist"


def is_user_enumeration_request(orders: str) -> bool:
    normalized = _normalize_free_text_orders(orders)
    if not normalized:
        return False

    return any(
        token in normalized
        for token in [
            "how many users",
            "user count",
            "users exist",
            "local users",
            "accounts",
            "account list",
            "sam",
            "profilelist",
            "windows users",
            "users directory",
        ]
    )


def enumerate_users_from_directory(evidence_path: str) -> dict[str, Any]:
    users_root = os.path.join(str(evidence_path or "").strip(), "Users")
    if not users_root or not os.path.isdir(users_root):
        return {
            "users_root": users_root,
            "exists": False,
            "count": 0,
            "profiles": [],
            "regular_profiles": [],
            "note": "Users directory not found.",
        }

    exclude_names = {
        "all users",
        "default",
        "default user",
        "public",
        "desktop.ini",
    }

    profiles: list[str] = []
    regular_profiles: list[str] = []
    try:
        for entry in sorted(os.listdir(users_root)):
            full_path = os.path.join(users_root, entry)
            if not os.path.isdir(full_path):
                continue
            profiles.append(entry)
            if entry.strip().lower() not in exclude_names:
                regular_profiles.append(entry)
    except Exception as exc:
        return {
            "users_root": users_root,
            "exists": True,
            "count": 0,
            "profiles": [],
            "regular_profiles": [],
            "error": str(exc),
            "note": "Failed to enumerate users directory.",
        }

    return {
        "users_root": users_root,
        "exists": True,
        "count": len(regular_profiles),
        "profiles": profiles,
        "regular_profiles": regular_profiles,
        "note": "Directory-based user enumeration.",
    }


def collect_user_artifact_snapshot(evidence_path: str, max_profiles: int = 24) -> dict[str, Any]:
    users_info = enumerate_users_from_directory(evidence_path)
    users_root = str(users_info.get("users_root") or "")

    if not users_info.get("exists"):
        return {
            "users_root": users_root,
            "users_root_exists": False,
            "profiles": [],
            "note": "Users directory not found.",
        }

    profile_names = users_info.get("profiles") if isinstance(users_info.get("profiles"), list) else []
    snapshots: list[dict[str, Any]] = []

    for profile_name in profile_names[: max(1, int(max_profiles or 24))]:
        profile_dir = os.path.join(users_root, str(profile_name))
        ntuser_path = os.path.join(profile_dir, "NTUSER.DAT")
        usrclass_path = os.path.join(profile_dir, "AppData", "Local", "Microsoft", "Windows", "UsrClass.dat")
        ntuser_exists = os.path.isfile(ntuser_path)
        usrclass_exists = os.path.isfile(usrclass_path)

        ntuser_mtime = None
        if ntuser_exists:
            try:
                ntuser_mtime = os.path.getmtime(ntuser_path)
            except Exception:
                ntuser_mtime = None

        snapshots.append(
            {
                "profile": str(profile_name),
                "profile_dir": profile_dir,
                "ntuser_dat_path": ntuser_path,
                "ntuser_dat_exists": ntuser_exists,
                "ntuser_dat_mtime_epoch": ntuser_mtime,
                "usrclass_dat_path": usrclass_path,
                "usrclass_dat_exists": usrclass_exists,
            }
        )

    return {
        "users_root": users_root,
        "users_root_exists": True,
        "profiles": snapshots,
        "note": "Filesystem snapshot of user-profile artifacts.",
    }


def strip_thinking_markup(text: str) -> str:
    cleaned = re.sub(r"<think(?:ing)?>.*?</think(?:ing)?>", "", text, flags=re.IGNORECASE | re.DOTALL)
    return cleaned.strip()


def extract_first_json_object(text: str) -> dict[str, Any]:
    cleaned = strip_thinking_markup(text)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass

    start = cleaned.find("{")
    if start < 0:
        raise json.JSONDecodeError("No JSON object found", cleaned, 0)

    depth = 0
    in_string = False
    escape = False

    for index in range(start, len(cleaned)):
        char = cleaned[index]

        if in_string:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == '"':
                in_string = False
            continue

        if char == '"':
            in_string = True
            continue

        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                candidate = cleaned[start : index + 1]
                return json.loads(candidate)

    raise json.JSONDecodeError("Unterminated JSON object", cleaned, start)


def normalize_launch_command(command: str, args: list[str]) -> tuple[str, list[str]]:
    command_value = str(command or "").strip()
    normalized_args = [str(arg) for arg in (args or []) if str(arg).strip()]

    if not command_value:
        return "", normalized_args

    if normalized_args:
        return command_value, normalized_args

    split_parts = shlex.split(command_value)
    if not split_parts:
        return "", []

    return split_parts[0], split_parts[1:]


def ensure_mcp_process_running() -> None:
    if session.mcp_process and session.mcp_process.poll() is None:
        return

    if not session.mcp_command:
        raise RuntimeError("MCP command is not configured for this session.")

    command = [session.mcp_command, *session.mcp_args]
    session.mcp_process = subprocess.Popen(
        command,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1,
    )
    session.mcp_initialized = False
    session.mcp_request_id = 0


def _mcp_write_message(payload: dict[str, Any]) -> None:
    ensure_mcp_process_running()
    if not session.mcp_process or not session.mcp_process.stdin:
        raise RuntimeError("MCP process stdin is not available.")

    body = json.dumps(payload, separators=(",", ":"))
    if session.mcp_transport == "line":
        session.mcp_process.stdin.write(body + "\n")
    else:
        encoded = body.encode("utf-8")
        header = f"Content-Length: {len(encoded)}\r\n\r\n"
        session.mcp_process.stdin.write(header + encoded.decode("utf-8"))
    session.mcp_process.stdin.flush()


def _mcp_read_message(timeout_seconds: float) -> dict[str, Any]:
    ensure_mcp_process_running()
    if not session.mcp_process or not session.mcp_process.stdout:
        raise RuntimeError("MCP process stdout is not available.")

    stdout = session.mcp_process.stdout
    deadline = time.monotonic() + max(0.1, float(timeout_seconds or 0))

    while time.monotonic() < deadline:
        remaining = max(0.01, deadline - time.monotonic())
        ready, _, _ = select.select([stdout], [], [], remaining)
        if not ready:
            continue

        line = stdout.readline()
        if not line:
            stderr_text = ""
            if session.mcp_process.stderr:
                try:
                    stderr_text = session.mcp_process.stderr.read() or ""
                except Exception:
                    stderr_text = ""
            raise RuntimeError(f"MCP process exited unexpectedly. stderr={stderr_text[:1000]}")

        stripped = line.strip()
        if not stripped:
            continue

        if stripped.lower().startswith("content-length:"):
            try:
                expected_len = int(stripped.split(":", 1)[1].strip())
            except Exception as exc:
                raise RuntimeError(f"Invalid Content-Length header from MCP process: {stripped}") from exc

            # Consume header terminator line.
            _ = stdout.readline()

            payload = stdout.read(expected_len)
            if not payload:
                raise RuntimeError("MCP process returned an empty payload body.")
            return json.loads(payload)

        if stripped.startswith("{"):
            return json.loads(stripped)

    raise TimeoutError(f"Timed out waiting for MCP response after {timeout_seconds} seconds.")


def _mcp_request(method: str, params: dict[str, Any], timeout_seconds: float = MCP_REQUEST_TIMEOUT_SECONDS) -> dict[str, Any]:
    with session.mcp_io_lock:
        session.mcp_request_id += 1
        request_id = session.mcp_request_id

        _mcp_write_message(
            {
                "jsonrpc": "2.0",
                "id": request_id,
                "method": method,
                "params": params,
            }
        )

        deadline = time.monotonic() + max(0.1, timeout_seconds)
        while time.monotonic() < deadline:
            remaining = max(0.1, deadline - time.monotonic())
            message = _mcp_read_message(remaining)
            if int(message.get("id") or -1) != request_id:
                continue
            if "error" in message:
                raise RuntimeError(str(message.get("error")))
            result = message.get("result")
            if isinstance(result, dict):
                return result
            return {}

    raise TimeoutError(f"Timed out waiting for MCP method '{method}' response.")


def _mcp_notify(method: str, params: dict[str, Any]) -> None:
    with session.mcp_io_lock:
        _mcp_write_message(
            {
                "jsonrpc": "2.0",
                "method": method,
                "params": params,
            }
        )


def ensure_mcp_initialized() -> None:
    ensure_mcp_process_running()
    if session.mcp_initialized:
        return

    protocol_versions = ["2024-11-05", "2024-10-07", "2024-09-25"]
    transport_modes = ["content-length", "line"]

    initialize_error: Exception | None = None
    for transport_mode in transport_modes:
        session.mcp_transport = transport_mode
        for protocol_version in protocol_versions:
            init_timeout = max(0.1, min(MCP_INITIALIZE_TIMEOUT_SECONDS, MCP_INIT_PROBE_TIMEOUT_SECONDS))
            try:
                _mcp_request(
                    "initialize",
                    {
                        "protocolVersion": protocol_version,
                        "capabilities": {},
                        "clientInfo": {"name": "dfir-checklist-bridge", "version": "0.1.0"},
                    },
                    timeout_seconds=init_timeout,
                )
                _mcp_notify("notifications/initialized", {})
                _mcp_request("tools/list", {}, timeout_seconds=init_timeout)
                session.mcp_initialized = True
                return
            except Exception as exc:
                initialize_error = exc
                continue

    if initialize_error:
        raise initialize_error

    raise RuntimeError("MCP initialization failed with no detailed error.")


def _mcp_text_from_result(result: dict[str, Any]) -> str:
    content = result.get("content")
    if not isinstance(content, list):
        return ""

    parts: list[str] = []
    for item in content:
        if not isinstance(item, dict):
            continue
        if item.get("type") == "text":
            text = str(item.get("text") or "").strip()
            if text:
                parts.append(text)

    return "\n\n".join(parts)


def _summarize_mcp_output(parsed_output: Any) -> Any:
    if isinstance(parsed_output, dict):
        keys = list(parsed_output.keys())[:20]
        return {
            "type": "object",
            "keys": keys,
            "key_count": len(parsed_output.keys()),
        }
    if isinstance(parsed_output, list):
        return {
            "type": "array",
            "count": len(parsed_output),
        }
    if isinstance(parsed_output, str):
        return parsed_output[:400]
    return parsed_output


def _artifact_display_name(artifact: dict[str, Any]) -> str:
    for key in ("artifact", "name", "title", "label", "id"):
        value = str(artifact.get(key) or "").strip()
        if value:
            return value
    return "unnamed-artifact"


def _artifact_keyword_blob(artifact: dict[str, Any]) -> str:
    parts = [
        str(artifact.get("id") or ""),
        str(artifact.get("artifact") or ""),
        str(artifact.get("name") or ""),
        str(artifact.get("title") or ""),
        str(artifact.get("label") or ""),
        str(artifact.get("comment") or ""),
        str(artifact.get("details") or ""),
    ]
    return " ".join(parts).strip().lower()


def _build_mcp_plan_for_artifact(
    artifact: dict[str, Any],
    evidence_path: str,
    execution_target: str,
    ioc: str,
) -> list[dict[str, Any]]:
    calls: list[dict[str, Any]] = []
    blob = _artifact_keyword_blob(artifact)

    if any(token in blob for token in ["prefetch", "amcache", "srum", "execution", "run count"]):
        target = execution_target.strip() or ioc.strip() or _artifact_display_name(artifact)
        if target:
            calls.append(
                {
                    "tool": "investigate_execution",
                    "arguments": {
                        "target": target,
                        "artifacts_dir": evidence_path,
                    },
                    "reason": "Execution-focused artifact",
                }
            )

    if any(token in blob for token in ["ioc", "hash", "domain", "ip", "indicator", "yara", "virustotal", "malware"]):
        if ioc.strip():
            calls.append(
                {
                    "tool": "hunt_ioc",
                    "arguments": {
                        "ioc": ioc.strip(),
                        "artifacts_dir": evidence_path,
                        "ioc_type": "auto",
                    },
                    "reason": "IOC-focused artifact",
                }
            )

    if any(token in blob for token in ["timeline", "mft", "usn", "evtx", "event log"]):
        calls.append(
            {
                "tool": "build_timeline",
                "arguments": {
                    "artifacts_dir": evidence_path,
                    "sources": ["mft", "usn", "prefetch", "amcache", "evtx"],
                    "limit": 200,
                },
                "reason": "Timeline-focused artifact",
            }
        )

    if any(token in blob for token in ["browser", "lnk", "shellbag", "recentdoc", "user activity"]):
        calls.append(
            {
                "tool": "investigate_user_activity",
                "arguments": {
                    "artifacts_dir": evidence_path,
                    "limit": 100,
                },
                "reason": "User-activity-focused artifact",
            }
        )

    if not calls:
        # Fallback keeps behavior explicit even when artifact labels are generic.
        calls.append(
            {
                "tool": "build_timeline",
                "arguments": {
                    "artifacts_dir": evidence_path,
                    "sources": ["prefetch", "amcache"],
                    "limit": 100,
                },
                "reason": "Fallback artifact triage",
            }
        )

        if ioc.strip():
            calls.append(
                {
                    "tool": "hunt_ioc",
                    "arguments": {
                        "ioc": ioc.strip(),
                        "artifacts_dir": evidence_path,
                        "ioc_type": "auto",
                    },
                    "reason": "Fallback IOC triage",
                }
            )

    return calls


def _normalize_free_text_orders(orders: str) -> str:
    return str(orders or "").strip().lower()


def _build_mcp_plan_from_orders(
    orders: str,
    evidence_path: str,
    execution_target: str,
    ioc: str,
) -> list[dict[str, Any]]:
    normalized = _normalize_free_text_orders(orders)
    if not normalized:
        return []

    looks_comprehensive = any(
        token in normalized
        for token in [
            "everything",
            "all artifacts",
            "anomal",
            "anomaly",
            "full",
            "comprehensive",
            "do everything",
            "analyze this machine",
        ]
    )

    calls: list[dict[str, Any]] = []

    user_enumeration_request = is_user_enumeration_request(normalized)

    if user_enumeration_request:
        calls.append(
            {
                "tool": "investigate_user_activity",
                "arguments": {
                    "artifacts_dir": evidence_path,
                    "limit": 200,
                },
                "reason": "Free-text user/account enumeration request",
            }
        )

    if looks_comprehensive:
        calls.append(
            {
                "tool": "build_timeline",
                "arguments": {
                    "artifacts_dir": evidence_path,
                    "sources": ["mft", "usn", "prefetch", "amcache", "evtx"],
                    "limit": 400,
                },
                "reason": "Free-text comprehensive timeline sweep",
            }
        )
        calls.append(
            {
                "tool": "investigate_user_activity",
                "arguments": {
                    "artifacts_dir": evidence_path,
                    "limit": 200,
                },
                "reason": "Free-text comprehensive user activity sweep",
            }
        )

        if execution_target.strip():
            calls.append(
                {
                    "tool": "investigate_execution",
                    "arguments": {
                        "target": execution_target.strip(),
                        "artifacts_dir": evidence_path,
                    },
                    "reason": "Free-text execution validation sweep",
                }
            )

        if ioc.strip():
            calls.append(
                {
                    "tool": "hunt_ioc",
                    "arguments": {
                        "ioc": ioc.strip(),
                        "artifacts_dir": evidence_path,
                        "ioc_type": "auto",
                    },
                    "reason": "Free-text IOC sweep",
                }
            )

        return calls

    if "timeline" in normalized:
        calls.append(
            {
                "tool": "build_timeline",
                "arguments": {
                    "artifacts_dir": evidence_path,
                    "sources": ["mft", "usn", "prefetch", "amcache", "evtx"],
                    "limit": 300,
                },
                "reason": "Free-text timeline request",
            }
        )

    if any(token in normalized for token in ["user", "activity", "browser", "lnk", "shellbag"]):
        calls.append(
            {
                "tool": "investigate_user_activity",
                "arguments": {
                    "artifacts_dir": evidence_path,
                    "limit": 200,
                },
                "reason": "Free-text user activity request",
            }
        )

    if any(token in normalized for token in ["logon", "login", "sign in", "signin", "last logon", "last login"]):
        calls.append(
            {
                "tool": "build_timeline",
                "arguments": {
                    "artifacts_dir": evidence_path,
                    "sources": ["evtx", "prefetch", "amcache"],
                    "limit": 250,
                },
                "reason": "Free-text logon/login evidence request",
            }
        )

    if any(token in normalized for token in ["execution", "executed", "ran", "run"]) and execution_target.strip():
        calls.append(
            {
                "tool": "investigate_execution",
                "arguments": {
                    "target": execution_target.strip(),
                    "artifacts_dir": evidence_path,
                },
                "reason": "Free-text execution request",
            }
        )

    if any(token in normalized for token in ["ioc", "hash", "domain", "ip", "indicator"]) and ioc.strip():
        calls.append(
            {
                "tool": "hunt_ioc",
                "arguments": {
                    "ioc": ioc.strip(),
                    "artifacts_dir": evidence_path,
                    "ioc_type": "auto",
                },
                "reason": "Free-text IOC request",
            }
        )

    # Keep the free-text planner focused: avoid duplicate tool calls with identical arguments.
    deduped_calls: list[dict[str, Any]] = []
    seen_signatures: set[tuple[str, str]] = set()
    for call in calls:
        tool_name = str(call.get("tool") or "").strip()
        arguments = call.get("arguments") if isinstance(call.get("arguments"), dict) else {}
        signature = (tool_name, json.dumps(arguments, sort_keys=True, separators=(",", ":")))
        if signature in seen_signatures:
            continue
        seen_signatures.add(signature)
        deduped_calls.append(call)

    return deduped_calls


def run_mcp_activity_trace(
    evidence_path: str,
    execution_target: str,
    ioc: str,
    artifacts: list[dict[str, Any]],
    mcp_orders: str = "",
    progress_callback: Any = None,
    should_cancel: Any = None,
) -> dict[str, Any]:
    trace: list[dict[str, Any]] = []
    attempted = 0
    succeeded = 0
    failed = 0

    free_text_calls = _build_mcp_plan_from_orders(mcp_orders, evidence_path, execution_target, ioc)

    if not artifacts and not free_text_calls:
        return {
            "enabled": bool(session.mcp_command),
            "ran": False,
            "reason": "No selected artifacts or MCP free-text orders for execution.",
            "attempted_calls": 0,
            "successful_calls": 0,
            "failed_calls": 0,
            "trace": [],
        }

    if not session.mcp_command:
        return {
            "enabled": False,
            "ran": False,
            "reason": "MCP command is not configured.",
            "attempted_calls": 0,
            "successful_calls": 0,
            "failed_calls": 0,
            "trace": [],
        }

    if callable(should_cancel) and should_cancel():
        return {
            "enabled": bool(session.mcp_command),
            "ran": False,
            "reason": "Analysis cancelled before MCP initialization.",
            "attempted_calls": 0,
            "successful_calls": 0,
            "failed_calls": 0,
            "trace": [],
        }

    if callable(progress_callback):
        progress_callback(
            {
                "phase": "init-start",
                "message": "Initializing MCP server session...",
            }
        )

    try:
        ensure_mcp_initialized()
        if callable(progress_callback):
            progress_callback(
                {
                    "phase": "init-finish",
                    "ok": True,
                    "message": "MCP server session initialized.",
                }
            )
    except Exception as exc:
        session.mcp_last_error = str(exc)
        if callable(progress_callback):
            progress_callback(
                {
                    "phase": "init-finish",
                    "ok": False,
                    "message": f"MCP initialization failed: {exc}",
                    "error": str(exc),
                }
            )
        return {
            "enabled": True,
            "ran": False,
            "reason": f"MCP initialization failed: {exc}",
            "attempted_calls": 0,
            "successful_calls": 0,
            "failed_calls": 0,
            "trace": [],
        }

    if free_text_calls:
        for call in free_text_calls:
            if callable(should_cancel) and should_cancel():
                return {
                    "enabled": True,
                    "ran": attempted > 0,
                    "reason": "Analysis cancelled during MCP execution.",
                    "attempted_calls": attempted,
                    "successful_calls": succeeded,
                    "failed_calls": failed,
                    "trace": trace,
                }

            attempted += 1
            started = time.perf_counter()
            tool_name = str(call.get("tool") or "").strip()
            arguments = call.get("arguments") if isinstance(call.get("arguments"), dict) else {}
            if callable(progress_callback):
                progress_callback(
                    {
                        "phase": "start",
                        "artifact_id": "free-text-order",
                        "artifact": "MCP free-text order",
                        "tool": tool_name,
                        "reason": call.get("reason") or "",
                        "arguments": arguments,
                    }
                )

            try:
                result = _mcp_request("tools/call", {"name": tool_name, "arguments": arguments}, timeout_seconds=MCP_TOOL_TIMEOUT_SECONDS)
                raw_text = _mcp_text_from_result(result)
                parsed_output: Any = None
                if raw_text:
                    try:
                        parsed_output = json.loads(raw_text)
                    except json.JSONDecodeError:
                        parsed_output = raw_text

                duration = round(time.perf_counter() - started, 3)
                succeeded += 1

                trace.append(
                    {
                        "artifact_id": "free-text-order",
                        "artifact": "MCP free-text order",
                        "tool": tool_name,
                        "reason": call.get("reason") or "",
                        "arguments": arguments,
                        "ok": True,
                        "duration_seconds": duration,
                        "result_excerpt": (raw_text[:2000] + "...") if len(raw_text) > 2000 else raw_text,
                        "result_summary": _summarize_mcp_output(parsed_output),
                    }
                )
                if callable(progress_callback):
                    progress_callback(
                        {
                            "phase": "finish",
                            "artifact_id": "free-text-order",
                            "artifact": "MCP free-text order",
                            "tool": tool_name,
                            "ok": True,
                            "duration_seconds": duration,
                            "result_excerpt": (raw_text[:400] + "...") if len(raw_text) > 400 else raw_text,
                        }
                    )
            except Exception as exc:
                duration = round(time.perf_counter() - started, 3)
                failed += 1
                trace.append(
                    {
                        "artifact_id": "free-text-order",
                        "artifact": "MCP free-text order",
                        "tool": tool_name,
                        "reason": call.get("reason") or "",
                        "arguments": arguments,
                        "ok": False,
                        "duration_seconds": duration,
                        "error": str(exc),
                    }
                )
                if callable(progress_callback):
                    progress_callback(
                        {
                            "phase": "finish",
                            "artifact_id": "free-text-order",
                            "artifact": "MCP free-text order",
                            "tool": tool_name,
                            "ok": False,
                            "duration_seconds": duration,
                            "error": str(exc),
                        }
                    )

    for artifact in artifacts:
        artifact_id = str(artifact.get("id") or "").strip()
        artifact_name = _artifact_display_name(artifact)
        planned_calls = _build_mcp_plan_for_artifact(artifact, evidence_path, execution_target, ioc)

        for call in planned_calls:
            if callable(should_cancel) and should_cancel():
                return {
                    "enabled": True,
                    "ran": attempted > 0,
                    "reason": "Analysis cancelled during MCP execution.",
                    "attempted_calls": attempted,
                    "successful_calls": succeeded,
                    "failed_calls": failed,
                    "trace": trace,
                }

            attempted += 1
            started = time.perf_counter()
            tool_name = str(call.get("tool") or "").strip()
            arguments = call.get("arguments") if isinstance(call.get("arguments"), dict) else {}
            if callable(progress_callback):
                progress_callback(
                    {
                        "phase": "start",
                        "artifact_id": artifact_id,
                        "artifact": artifact_name,
                        "tool": tool_name,
                        "reason": call.get("reason") or "",
                        "arguments": arguments,
                    }
                )

            try:
                result = _mcp_request("tools/call", {"name": tool_name, "arguments": arguments}, timeout_seconds=MCP_TOOL_TIMEOUT_SECONDS)
                raw_text = _mcp_text_from_result(result)
                parsed_output: Any = None
                if raw_text:
                    try:
                        parsed_output = json.loads(raw_text)
                    except json.JSONDecodeError:
                        parsed_output = raw_text

                duration = round(time.perf_counter() - started, 3)
                succeeded += 1

                trace.append(
                    {
                        "artifact_id": artifact_id,
                        "artifact": artifact_name,
                        "tool": tool_name,
                        "reason": call.get("reason") or "",
                        "arguments": arguments,
                        "ok": True,
                        "duration_seconds": duration,
                        "result_excerpt": (raw_text[:2000] + "...") if len(raw_text) > 2000 else raw_text,
                        "result_summary": _summarize_mcp_output(parsed_output),
                    }
                )
                if callable(progress_callback):
                    progress_callback(
                        {
                            "phase": "finish",
                            "artifact_id": artifact_id,
                            "artifact": artifact_name,
                            "tool": tool_name,
                            "ok": True,
                            "duration_seconds": duration,
                            "result_excerpt": (raw_text[:400] + "...") if len(raw_text) > 400 else raw_text,
                        }
                    )
            except Exception as exc:
                duration = round(time.perf_counter() - started, 3)
                failed += 1
                trace.append(
                    {
                        "artifact_id": artifact_id,
                        "artifact": artifact_name,
                        "tool": tool_name,
                        "reason": call.get("reason") or "",
                        "arguments": arguments,
                        "ok": False,
                        "duration_seconds": duration,
                        "error": str(exc),
                    }
                )
                if callable(progress_callback):
                    progress_callback(
                        {
                            "phase": "finish",
                            "artifact_id": artifact_id,
                            "artifact": artifact_name,
                            "tool": tool_name,
                            "ok": False,
                            "duration_seconds": duration,
                            "error": str(exc),
                        }
                    )

    return {
        "enabled": True,
        "ran": attempted > 0,
        "reason": "MCP tool execution completed." if attempted > 0 else "No MCP calls were planned.",
        "attempted_calls": attempted,
        "successful_calls": succeeded,
        "failed_calls": failed,
        "trace": trace,
    }


def now_ts() -> float:
    return time.time()


def touch_session() -> None:
    session.last_activity_ts = now_ts()


def session_idle_seconds() -> int:
    if not session.active:
        return 0
    return max(0, int(now_ts() - session.last_activity_ts))


def is_session_expired() -> bool:
    if not session.active:
        return False
    return session_idle_seconds() >= session.idle_timeout_minutes * 60


def stop_session_internal(reason: str = "Session stopped.") -> dict[str, Any]:
    unload_message = ""
    if session.model or session.model_instance_id:
        unload_error = lmstudio_unload_all_for_session()
        if unload_error:
            unload_message = f" Model unload warning: {unload_error}"

    if session.mcp_process and session.mcp_process.poll() is None:
        session.mcp_process.terminate()
        try:
            session.mcp_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            session.mcp_process.kill()

    session.active = False
    session.model = ""
    session.model_instance_id = ""
    session.model_loaded = False
    session.context_length = 0
    session.mcp_command = ""
    session.mcp_args = []
    session.mcp_process = None
    session.mcp_initialized = False
    session.mcp_request_id = 0
    session.mcp_last_error = ""
    session.last_activity_ts = 0.0
    session.analysis_cancel_requested = False

    return {
        "active": False,
        "message": f"{reason}{unload_message}".strip(),
        "model": "",
        "model_instance_id": "",
        "model_loaded": False,
        "context_length": 0,
        "idle_seconds": 0,
        "mcp_running": False,
        "mcp_error": "",
    }


def ensure_active_session() -> None:
    if not session.active:
        raise HTTPException(status_code=400, detail="No active AI session. Start a session first.")
    if is_session_expired():
        stop_session_internal("Session stopped after idle timeout.")
        raise HTTPException(status_code=400, detail="AI session expired due to idle timeout.")
    touch_session()


def is_analysis_cancel_requested() -> bool:
    return bool(session.analysis_cancel_requested)


def lmstudio_chat(messages: list[dict[str, str]], temperature: float = 0.1) -> str:
    if not session.model:
        raise HTTPException(status_code=400, detail="Model not set for this session.")

    endpoint = f"{session.lmstudio_base_url.rstrip('/')}/chat/completions"
    payload = {
        "model": session.model,
        "messages": messages,
        "temperature": temperature,
    }

    try:
        response = requests.post(
            endpoint,
            json=payload,
            timeout=(LMSTUDIO_CONNECT_TIMEOUT_SECONDS, LMSTUDIO_READ_TIMEOUT_SECONDS),
        )
    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=(
                f"LM Studio request failed: {exc}. "
                f"(connect_timeout={LMSTUDIO_CONNECT_TIMEOUT_SECONDS}s, read_timeout={LMSTUDIO_READ_TIMEOUT_SECONDS}s)"
            ),
        ) from exc

    if response.status_code >= 400:
        raise HTTPException(status_code=502, detail=f"LM Studio error {response.status_code}: {response.text}")

    try:
        data = response.json()
        return data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, ValueError, TypeError) as exc:
        raise HTTPException(status_code=502, detail="LM Studio returned an unexpected response.") from exc


def lmstudio_origin() -> str:
    base = session.lmstudio_base_url.strip()
    parsed = urlparse(base)
    scheme = parsed.scheme or "http"
    netloc = parsed.netloc or parsed.path
    if not netloc:
        return "http://127.0.0.1:1234"
    return f"{scheme}://{netloc}".rstrip("/")


def lmstudio_stream_chat_tokens(messages: list[dict[str, str]], temperature: float = 0.1):
    if not session.model:
        raise HTTPException(status_code=400, detail="Model not set for this session.")

    endpoint = f"{session.lmstudio_base_url.rstrip('/')}/chat/completions"
    payload = {
        "model": session.model,
        "messages": messages,
        "temperature": temperature,
        "stream": True,
    }

    in_think_block = False

    def _yield_from_payload_line(payload_line: str):
        nonlocal in_think_block

        raw_payload = str(payload_line or "").strip()
        if not raw_payload:
            return

        if raw_payload == "[DONE]":
            return "done"

        try:
            chunk = json.loads(raw_payload)
        except (TypeError, ValueError):
            return

        # Some servers ignore stream=true and return one full completion payload.
        if isinstance(chunk.get("choices"), list) and chunk.get("choices"):
            first_choice = chunk["choices"][0] if isinstance(chunk["choices"][0], dict) else {}

            message_obj = first_choice.get("message") if isinstance(first_choice.get("message"), dict) else {}
            message_content = message_obj.get("content")
            if isinstance(message_content, str) and message_content:
                split_segments, in_think_block = split_think_tag_segments(message_content, in_think_block)
                for segment in split_segments:
                    yield segment
                return "single-response"

            text_content = first_choice.get("text")
            if isinstance(text_content, str) and text_content:
                split_segments, in_think_block = split_think_tag_segments(text_content, in_think_block)
                for segment in split_segments:
                    yield segment
                return "single-response"

        choices = chunk.get("choices")
        if not isinstance(choices, list) or not choices:
            return

        first_choice = choices[0] if isinstance(choices[0], dict) else {}
        delta = first_choice.get("delta") if isinstance(first_choice.get("delta"), dict) else {}
        if not delta:
            return

        # Some models stream regular content, while others stream reasoning in alternate fields.
        for key in ("content", "reasoning_content", "reasoning", "text"):
            value = delta.get(key)
            if isinstance(value, str) and value:
                if key in {"reasoning_content", "reasoning"}:
                    yield {"text": value, "channel": "thinking"}
                    continue

                split_segments, in_think_block = split_think_tag_segments(value, in_think_block)
                for segment in split_segments:
                    yield segment

    try:
        with requests.post(
            endpoint,
            json=payload,
            stream=True,
            timeout=(LMSTUDIO_CONNECT_TIMEOUT_SECONDS, LMSTUDIO_READ_TIMEOUT_SECONDS),
        ) as response:
            if response.status_code >= 400:
                raise HTTPException(status_code=502, detail=f"LM Studio error {response.status_code}: {response.text}")

            for raw_line in response.iter_lines(decode_unicode=True):
                if is_analysis_cancel_requested():
                    return

                line = str(raw_line or "")
                stripped = line.strip()
                if not stripped:
                    continue

                # Handle SSE payloads and line-delimited JSON payloads with minimal latency.
                payload_content = stripped[5:].strip() if stripped.startswith("data:") else stripped
                if not payload_content:
                    continue

                if os.getenv("LMSTUDIO_STREAM_DEBUG", "").strip() == "1":
                    print(f"[lmstudio-stream] {payload_content[:300]}", flush=True)

                signal = None
                for segment in _yield_from_payload_line(payload_content):
                    if isinstance(segment, dict):
                        yield segment
                    elif isinstance(segment, str):
                        signal = segment

                if signal in {"done", "single-response"}:
                    return
    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=(
                f"LM Studio request failed: {exc}. "
                f"(connect_timeout={LMSTUDIO_CONNECT_TIMEOUT_SECONDS}s, read_timeout={LMSTUDIO_READ_TIMEOUT_SECONDS}s)"
            ),
        ) from exc


def sse_event(event_name: str, payload: dict[str, Any]) -> str:
    return f"event: {event_name}\ndata: {json.dumps(payload)}\n\n"


def split_think_tag_segments(text: str, in_think_block: bool = False) -> tuple[list[dict[str, str]], bool]:
    raw = str(text or "")
    if not raw:
        return [], in_think_block

    segments: list[dict[str, str]] = []
    cursor = 0
    current_mode_is_thinking = in_think_block
    lowered = raw.lower()

    while cursor < len(raw):
        open_think_index = lowered.find("<think>", cursor)
        open_thinking_index = lowered.find("<thinking>", cursor)
        close_think_index = lowered.find("</think>", cursor)
        close_thinking_index = lowered.find("</thinking>", cursor)

        open_candidates = [index for index in (open_think_index, open_thinking_index) if index >= 0]
        close_candidates = [index for index in (close_think_index, close_thinking_index) if index >= 0]

        open_index = min(open_candidates) if open_candidates else -1
        close_index = min(close_candidates) if close_candidates else -1

        next_tag_index = -1
        next_tag_kind = ""
        if open_index >= 0 and (close_index < 0 or open_index < close_index):
            next_tag_index = open_index
            next_tag_kind = "open"
        elif close_index >= 0:
            next_tag_index = close_index
            next_tag_kind = "close"

        if next_tag_index < 0:
            chunk = raw[cursor:]
            if chunk:
                segments.append({"text": chunk, "channel": "thinking" if current_mode_is_thinking else "final"})
            break

        if next_tag_index > cursor:
            chunk = raw[cursor:next_tag_index]
            if chunk:
                segments.append({"text": chunk, "channel": "thinking" if current_mode_is_thinking else "final"})

        if next_tag_kind == "open":
            current_mode_is_thinking = True
            if raw[next_tag_index:next_tag_index + len("<thinking>")].lower() == "<thinking>":
                cursor = next_tag_index + len("<thinking>")
            else:
                cursor = next_tag_index + len("<think>")
        else:
            current_mode_is_thinking = False
            if raw[next_tag_index:next_tag_index + len("</thinking>")].lower() == "</thinking>":
                cursor = next_tag_index + len("</thinking>")
            else:
                cursor = next_tag_index + len("</think>")

    return segments, current_mode_is_thinking


def lmstudio_models() -> list[dict[str, Any]]:
    endpoint = f"{lmstudio_origin()}/api/v1/models"
    try:
        response = requests.get(endpoint, timeout=30)
    except requests.RequestException as exc:
        raise HTTPException(status_code=502, detail=f"LM Studio model list request failed: {exc}") from exc

    if response.status_code >= 400:
        raise HTTPException(status_code=502, detail=f"LM Studio model list error {response.status_code}: {response.text}")

    try:
        data = response.json()
        models = data.get("models")
        if not isinstance(models, list):
            raise ValueError("Invalid models payload")
        return models
    except (ValueError, TypeError) as exc:
        raise HTTPException(status_code=502, detail="LM Studio model list returned unexpected payload.") from exc


def lmstudio_find_loaded_instance(model_key: str) -> str:
    for model in lmstudio_models():
        if model.get("key") != model_key:
            continue
        loaded_instances = model.get("loaded_instances")
        if not isinstance(loaded_instances, list) or not loaded_instances:
            return ""
        first_instance = loaded_instances[0]
        instance_id = first_instance.get("id") if isinstance(first_instance, dict) else ""
        return str(instance_id or "")
    return ""


def lmstudio_load_model(model_key: str, context_length: int = 0) -> str:
    existing_instance = lmstudio_find_loaded_instance(model_key)
    if existing_instance:
        return existing_instance

    endpoint = f"{lmstudio_origin()}/api/v1/models/load"

    payload_candidates: list[dict[str, Any]] = [{"model": model_key}]
    if context_length > 0:
        # Try both key styles to stay compatible with different LM Studio versions.
        payload_candidates = [
            {"model": model_key, "context_length": context_length},
            {"model": model_key, "contextLength": context_length},
            {"model": model_key},
        ]

    last_error_text = ""
    data: dict[str, Any] | None = None
    for payload in payload_candidates:
        try:
            response = requests.post(endpoint, json=payload, timeout=180)
        except requests.RequestException as exc:
            last_error_text = str(exc)
            continue

        if response.status_code >= 400:
            last_error_text = f"LM Studio model load error {response.status_code}: {response.text}"
            continue

        try:
            data = response.json()
            break
        except ValueError:
            last_error_text = "LM Studio model load returned unexpected payload."

    if data is None:
        raise HTTPException(status_code=502, detail=f"LM Studio model load request failed: {last_error_text or 'unknown error'}")

    instance_id = str(data.get("instance_id") or "").strip()
    if instance_id:
        return instance_id

    inferred_instance = lmstudio_find_loaded_instance(model_key)
    if inferred_instance:
        return inferred_instance

    raise HTTPException(status_code=502, detail="LM Studio did not report a loaded model instance.")


def lmstudio_unload_model(instance_id: str) -> None:
    endpoint = f"{lmstudio_origin()}/api/v1/models/unload"
    try:
        response = requests.post(endpoint, json={"instance_id": instance_id}, timeout=60)
    except requests.RequestException as exc:
        raise HTTPException(status_code=502, detail=f"LM Studio model unload request failed: {exc}") from exc

    if response.status_code >= 400:
        raise HTTPException(status_code=502, detail=f"LM Studio model unload error {response.status_code}: {response.text}")


def lmstudio_get_loaded_instance_ids(model_key: str) -> list[str]:
    loaded_ids: list[str] = []
    for model in lmstudio_models():
        if model.get("key") != model_key:
            continue

        loaded_instances = model.get("loaded_instances")
        if not isinstance(loaded_instances, list):
            continue

        for instance in loaded_instances:
            if not isinstance(instance, dict):
                continue
            instance_id = str(instance.get("id") or "").strip()
            if instance_id:
                loaded_ids.append(instance_id)

    return list(dict.fromkeys(loaded_ids))


def lmstudio_unload_all_for_session() -> str:
    instance_ids: list[str] = []

    if session.model_instance_id:
        instance_ids.append(session.model_instance_id)

    if session.model:
        try:
            instance_ids.extend(lmstudio_get_loaded_instance_ids(session.model))
        except HTTPException as exc:
            return str(exc.detail)

    instance_ids = list(dict.fromkeys([instance_id for instance_id in instance_ids if instance_id]))
    if not instance_ids:
        return ""

    errors: list[str] = []
    for instance_id in instance_ids:
        try:
            lmstudio_unload_model(instance_id)
        except HTTPException as exc:
            errors.append(str(exc.detail))

    return "; ".join(errors)


def _safe_int(value: Any) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return 0


def _first_positive_int(obj: dict[str, Any], keys: list[str]) -> int:
    for key in keys:
        if key not in obj:
            continue
        candidate = _safe_int(obj.get(key))
        if candidate > 0:
            return candidate
    return 0


@app.get("/api/ai/health")
def health() -> dict[str, Any]:
    return {
        "ok": True,
        "service": "dfir-ai-bridge",
        "timeouts": {
            "lmstudio_connect_seconds": LMSTUDIO_CONNECT_TIMEOUT_SECONDS,
            "lmstudio_read_seconds": LMSTUDIO_READ_TIMEOUT_SECONDS,
            "mcp_request_seconds": MCP_REQUEST_TIMEOUT_SECONDS,
            "mcp_initialize_seconds": MCP_INITIALIZE_TIMEOUT_SECONDS,
            "mcp_tool_seconds": MCP_TOOL_TIMEOUT_SECONDS,
        },
    }


@app.get("/api/ai/models")
def list_models() -> dict[str, Any]:
    models = []
    for model in lmstudio_models():
        if model.get("type") != "llm":
            continue

        key = str(model.get("key") or "").strip()
        if not key:
            continue

        display_name = str(model.get("display_name") or key).strip()
        loaded_instances = model.get("loaded_instances")
        loaded = isinstance(loaded_instances, list) and len(loaded_instances) > 0
        context_default = _first_positive_int(
            model,
            ["context_length", "contextLength", "default_context_length", "defaultContextLength"],
        )
        context_max = _first_positive_int(
            model,
            ["max_context_length", "maxContextLength", "max_context", "maxContext", "context_window"],
        )

        if context_default <= 0 and context_max > 0:
            context_default = context_max

        if context_max <= 0:
            context_max = max(context_default, 262144)

        context_min = 1024
        if context_default > 0:
            context_min = min(context_min, context_default)
        context_min = max(256, min(context_min, context_max))

        models.append({
            "key": key,
            "display_name": display_name,
            "loaded": loaded,
            "context_default": context_default,
            "context_min": context_min,
            "context_max": context_max,
        })

    return {"models": models}


@app.post("/api/ai/session/start")
def start_session(payload: SessionStartRequest) -> dict[str, Any]:
    if session.active:
        stop_session_internal("Previous session replaced by new session.")

    session.active = True
    session.model = payload.model.strip()
    session.model_instance_id = ""
    session.model_loaded = False
    session.context_length = int(payload.context_length or 0)
    session.lmstudio_base_url = payload.lmstudio_base_url.strip() or "http://127.0.0.1:1234/v1"
    session.idle_timeout_minutes = payload.idle_timeout_minutes
    session.mcp_command, session.mcp_args = normalize_launch_command(payload.mcp_command, payload.mcp_args)
    session.mcp_initialized = False
    session.mcp_request_id = 0
    session.mcp_last_error = ""
    touch_session()

    if not session.model:
        return stop_session_internal("Session start failed: model is required.")

    session.model_instance_id = lmstudio_load_model(session.model, context_length=session.context_length)
    session.model_loaded = True

    if session.mcp_command:
        try:
            ensure_mcp_process_running()
        except Exception as exc:
            session.mcp_process = None
            session.mcp_last_error = str(exc)

    start_message = "AI session started."
    if session.mcp_last_error:
        start_message = f"AI session started, but MCP launch failed. {session.mcp_last_error}"

    return {
        "active": True,
        "message": start_message,
        "model": session.model,
        "model_instance_id": session.model_instance_id,
        "model_loaded": session.model_loaded,
        "context_length": session.context_length,
        "lmstudio_base_url": session.lmstudio_base_url,
        "idle_timeout_minutes": session.idle_timeout_minutes,
        "idle_seconds": 0,
        "mcp_running": bool(session.mcp_process and session.mcp_process.poll() is None),
        "mcp_error": session.mcp_last_error,
    }


@app.get("/api/ai/session/status")
def session_status() -> dict[str, Any]:
    if session.active and is_session_expired():
        return stop_session_internal("Session stopped after idle timeout.")

    if session.active and session.model:
        try:
            current_instance = lmstudio_find_loaded_instance(session.model)
            session.model_instance_id = current_instance
            session.model_loaded = bool(current_instance)
        except HTTPException:
            # Keep previous values when LM Studio is temporarily unreachable.
            pass

    return {
        "active": session.active,
        "message": "Session active." if session.active else "No active session.",
        "model": session.model,
        "model_instance_id": session.model_instance_id,
        "model_loaded": session.model_loaded,
        "context_length": session.context_length,
        "lmstudio_base_url": session.lmstudio_base_url,
        "idle_timeout_minutes": session.idle_timeout_minutes,
        "idle_seconds": session_idle_seconds(),
        "mcp_running": bool(session.mcp_process and session.mcp_process.poll() is None),
        "mcp_error": session.mcp_last_error,
    }


@app.post("/api/ai/session/stop")
def stop_session() -> dict[str, Any]:
    if not session.active:
        return {
            "active": False,
            "message": "No active session.",
            "model": "",
            "model_instance_id": "",
            "model_loaded": False,
            "context_length": 0,
            "idle_seconds": 0,
            "mcp_running": False,
            "mcp_error": "",
        }
    return stop_session_internal("AI session stopped.")


@app.post("/api/ai/analyze/cancel")
def cancel_analysis() -> dict[str, Any]:
    if not session.active:
        return {"ok": False, "cancel_requested": False, "message": "No active session."}

    session.analysis_cancel_requested = True

    # If MCP is currently running, terminate it so blocking MCP reads unblock quickly.
    if session.mcp_process and session.mcp_process.poll() is None:
        session.mcp_process.terminate()
        try:
            session.mcp_process.wait(timeout=3)
        except subprocess.TimeoutExpired:
            session.mcp_process.kill()
        session.mcp_initialized = False
        session.mcp_process = None

    return {"ok": True, "cancel_requested": True, "message": "Analysis cancellation requested."}


@app.post("/api/ai/server/shutdown")
def shutdown_server() -> dict[str, Any]:
    # Stop any active session first so model/process cleanup happens before exit.
    if session.active:
        stop_session_internal("AI session stopped before backend shutdown.")

    def _shutdown() -> None:
        time.sleep(0.2)
        os._exit(0)

    threading.Thread(target=_shutdown, daemon=True).start()
    return {"ok": True, "message": "Backend shutdown requested."}


def collect_selected_artifacts(payload: AnalyzeRequest, default_to_all: bool = True) -> tuple[set[str], list[dict[str, Any]]]:
    selected_ids: set[str] = set()
    for item in payload.selected_artifacts:
        if isinstance(item, dict):
            candidate = str(item.get("id") or "").strip()
        else:
            candidate = str(item).strip()
        if candidate:
            selected_ids.add(candidate)

    selected_artifacts: list[dict[str, Any]] = []
    if selected_ids:
        for artifact in payload.artifacts:
            if not isinstance(artifact, dict):
                continue
            artifact_id = str(artifact.get("id") or "").strip()
            if artifact_id in selected_ids:
                selected_artifacts.append(artifact)
    elif default_to_all:
        selected_artifacts = [artifact for artifact in payload.artifacts if isinstance(artifact, dict)]
    else:
        selected_artifacts = []

    return selected_ids, selected_artifacts


def should_default_to_all_artifacts(payload: AnalyzeRequest) -> bool:
    has_free_text_orders = bool(str(payload.mcp_orders or "").strip())
    has_explicit_selection = any(str(item.get("id") if isinstance(item, dict) else item).strip() for item in payload.selected_artifacts)

    # Chat-style runs (free-text orders) stay focused unless the user explicitly selects artifacts.
    if has_free_text_orders and not has_explicit_selection:
        return False

    return True


def _normalize_chat_history(history: list[dict[str, str]]) -> list[dict[str, str]]:
    history_items: list[dict[str, str]] = []
    for item in history:
        if not isinstance(item, dict):
            continue
        role = str(item.get("role") or "").strip().lower()
        content = str(item.get("content") or "").strip()
        if role in {"user", "assistant"} and content:
            history_items.append({"role": role, "content": content})
    return history_items


def compose_checklist_response_text(summary: str, findings: list[Any]) -> str:
    summary_text = str(summary or "").strip()
    finding_lines = [str(item).strip() for item in (findings or []) if str(item).strip()]
    if summary_text and finding_lines:
        return summary_text + "\n\nKey points:\n- " + "\n- ".join(finding_lines[:8])
    if summary_text:
        return summary_text
    if finding_lines:
        return "Key points:\n- " + "\n- ".join(finding_lines[:8])
    return "Analysis completed."


def build_analysis_prompt(
    payload: AnalyzeRequest,
    selected_ids: set[str],
    selected_artifacts: list[dict[str, Any]],
    mcp_activity: dict[str, Any] | None = None,
    evidence_snapshot: dict[str, Any] | None = None,
) -> tuple[str, dict[str, Any], str, str]:
    thinking_mode = str(payload.thinking_mode or "enabled").strip().lower()
    response_mode = normalize_response_mode(payload.response_mode)
    analyst_request = str(payload.mcp_orders or payload.user_prompt_override or "").strip() or "Analyze the provided evidence."
    history_items = _normalize_chat_history(payload.chat_history)

    if response_mode == "chat":
        system_prompt = (
            "You are a DFIR assistant. Answer the analyst request directly using available evidence and MCP outputs. "
            "Return plain text by default. Do not output checklist-update JSON unless the analyst explicitly asks for JSON."
        )

        if thinking_mode == "enabled":
            system_prompt += " You may reason internally but return a clear final answer."
        else:
            system_prompt += " Keep the response concise and practical."

        if payload.system_prompt_override.strip():
            system_prompt = payload.system_prompt_override.strip()

        user_prompt: dict[str, Any] = {
            "task": "Respond to the analyst free-text request.",
            "analyst_request": analyst_request,
            "evidence_path": payload.evidence_path,
            "execution_target": payload.execution_target,
            "ioc": payload.ioc,
            "thinking_mode": thinking_mode,
            "notes": [
                "Use concrete paths/artifacts/values whenever available.",
                "If evidence is missing, state what is missing and what was checked.",
                "Do not claim a file is missing when local_evidence_snapshot shows it exists.",
                "Do not emit checklist card updates unless requested.",
            ],
        }

        if history_items:
            user_prompt["conversation_history"] = history_items[-12:]

        if mcp_activity is not None:
            user_prompt["mcp_activity"] = mcp_activity

        if evidence_snapshot is not None:
            user_prompt["local_evidence_snapshot"] = evidence_snapshot

        if payload.user_prompt_override.strip():
            user_prompt["analyst_custom_prompt"] = payload.user_prompt_override.strip()

        return system_prompt, user_prompt, thinking_mode, response_mode

    system_prompt = (
        "You are a DFIR assistant. Output only valid JSON with this schema: "
        "{\"summary\": string, \"findings\": [string], \"updates\": ["
        "{\"artifact\": string, \"status\": \"Done\"|\"Needs Review\"|\"N/A\", "
        "\"comment\": string, \"details\": string, \"evidence\": [string]}]}."
    )

    system_prompt += (
        " Use concrete evidence from MCP outputs: include exact IOC/path/hash/user/process/timestamp snippets where possible. "
        "Do not use generic placeholders like 'suspicious path found'."
    )
    system_prompt += (
        " The summary must read like the full analyst-facing answer (similar depth as chat mode), "
        "while updates are structured card changes."
    )

    if thinking_mode == "enabled":
        system_prompt += " You may reason internally, but final output must be JSON only and must match the schema exactly."
    else:
        system_prompt += " Keep reasoning concise and return only final JSON."

    if payload.system_prompt_override.strip():
        system_prompt = payload.system_prompt_override.strip()

    user_prompt: dict[str, Any] = {
        "task": "Analyze evidence and map findings to checklist artifacts.",
        "analyst_request": analyst_request,
        "evidence_path": payload.evidence_path,
        "execution_target": payload.execution_target,
        "ioc": payload.ioc,
        "mcp_orders": payload.mcp_orders,
        "artifacts": selected_artifacts,
        "selected_artifact_ids": list(selected_ids),
        "thinking_mode": thinking_mode,
        "notes": [
            "Prefer conservative status values.",
            "Only include updates when there is enough signal.",
            "Keep comments short and actionable.",
            "When adding details/evidence, include exact observed values rather than broad categories.",
            "In summary, directly answer the analyst request with concrete evidence.",
            "Do not claim a file is missing when local_evidence_snapshot shows it exists.",
        ],
    }

    if history_items:
        user_prompt["conversation_history"] = history_items[-12:]

    if mcp_activity is not None:
        user_prompt["mcp_activity"] = mcp_activity

    if evidence_snapshot is not None:
        user_prompt["local_evidence_snapshot"] = evidence_snapshot

    if payload.user_prompt_override.strip():
        user_prompt["analyst_custom_prompt"] = payload.user_prompt_override.strip()

    return system_prompt, user_prompt, thinking_mode, response_mode


@app.post("/api/ai/analyze/prompt-preview")
def analyze_prompt_preview(payload: AnalyzeRequest) -> dict[str, Any]:
    ensure_active_session()
    evidence_snapshot = collect_user_artifact_snapshot(payload.evidence_path)
    selected_ids, selected_artifacts = collect_selected_artifacts(
        payload,
        default_to_all=should_default_to_all_artifacts(payload),
    )
    system_prompt, user_prompt, _thinking_mode, response_mode = build_analysis_prompt(
        payload,
        selected_ids,
        selected_artifacts,
        evidence_snapshot=evidence_snapshot,
    )

    free_text_calls = _build_mcp_plan_from_orders(payload.mcp_orders, payload.evidence_path, payload.execution_target, payload.ioc)
    artifact_calls: list[dict[str, Any]] = []
    for artifact in selected_artifacts:
        artifact_id = str(artifact.get("id") or "").strip()
        artifact_name = _artifact_display_name(artifact)
        for call in _build_mcp_plan_for_artifact(artifact, payload.evidence_path, payload.execution_target, payload.ioc):
            artifact_calls.append(
                {
                    "artifact_id": artifact_id,
                    "artifact": artifact_name,
                    "tool": call.get("tool"),
                    "reason": call.get("reason"),
                    "arguments": call.get("arguments") if isinstance(call.get("arguments"), dict) else {},
                }
            )

    return {
        "response_mode": response_mode,
        "system_prompt": system_prompt,
        "user_prompt": user_prompt,
        "mcp_plan_preview": {
            "free_text_calls": free_text_calls,
            "artifact_calls": artifact_calls,
        },
    }


@app.post("/api/ai/analyze")
def analyze(payload: AnalyzeRequest) -> dict[str, Any]:
    ensure_active_session()
    session.analysis_cancel_requested = False
    evidence_snapshot = collect_user_artifact_snapshot(payload.evidence_path)

    response_mode = normalize_response_mode(payload.response_mode)
    user_enumeration_chat = response_mode == "chat" and is_user_enumeration_request(payload.mcp_orders)

    selected_ids, selected_artifacts = collect_selected_artifacts(
        payload,
        default_to_all=should_default_to_all_artifacts(payload),
    )

    if user_enumeration_chat:
        users_info = enumerate_users_from_directory(payload.evidence_path)
        mcp_activity = {
            "enabled": False,
            "ran": False,
            "reason": "Skipped MCP tools for focused Users-directory enumeration in chat mode.",
            "attempted_calls": 0,
            "successful_calls": 0,
            "failed_calls": 0,
            "trace": [
                {
                    "artifact_id": "free-text-order",
                    "artifact": "Users directory",
                    "tool": "local_users_directory_scan",
                    "ok": bool(users_info.get("exists")),
                    "result_summary": users_info,
                }
            ],
        }

        if users_info.get("exists"):
            names = users_info.get("regular_profiles") if isinstance(users_info.get("regular_profiles"), list) else []
            response_text = (
                f"Found {int(users_info.get('count') or 0)} user profile directory(ies) under {users_info.get('users_root')}: "
                f"{', '.join(str(name) for name in names) if names else '(none)'}"
            )
        else:
            response_text = (
                "I could not find a Users directory at "
                f"{users_info.get('users_root')}. Provide the mounted Windows root path that contains Users/."
            )

        return {
            "summary": "Free-text response generated.",
            "findings": [],
            "updates": [],
            "response_text": response_text,
            "response_mode": "chat",
            "mcp_activity": mcp_activity,
            "raw": {"response_text": response_text, "users": users_info},
        }

    mcp_activity = run_mcp_activity_trace(
        evidence_path=payload.evidence_path,
        execution_target=payload.execution_target,
        ioc=payload.ioc,
        artifacts=selected_artifacts,
        mcp_orders=payload.mcp_orders,
        should_cancel=is_analysis_cancel_requested,
    )

    if is_analysis_cancel_requested():
        return {
            "summary": "Analysis cancelled by user.",
            "findings": [],
            "updates": [],
            "mcp_activity": mcp_activity,
            "raw": {"cancelled": True},
            "cancelled": True,
        }
    system_prompt, user_prompt, _thinking_mode, response_mode = build_analysis_prompt(
        payload,
        selected_ids,
        selected_artifacts,
        mcp_activity,
        evidence_snapshot=evidence_snapshot,
    )

    completion = lmstudio_chat(
        [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": json.dumps(user_prompt)},
        ],
        temperature=0.0,
    )

    if response_mode == "chat":
        response_text = strip_thinking_markup(completion) or completion.strip() or "No response generated."
        try:
            parsed_chat = extract_first_json_object(response_text)
        except json.JSONDecodeError:
            parsed_chat = None

        if isinstance(parsed_chat, dict) and any(key in parsed_chat for key in ("summary", "findings", "updates")):
            summary_text = str(parsed_chat.get("summary") or "").strip()
            finding_lines = parsed_chat.get("findings") if isinstance(parsed_chat.get("findings"), list) else []
            compact_findings = [str(item).strip() for item in finding_lines if str(item).strip()][:5]
            response_text = summary_text or "Analysis completed."
            if compact_findings:
                response_text = response_text + "\n\nKey points:\n- " + "\n- ".join(compact_findings)

        return {
            "summary": "Free-text response generated.",
            "findings": [],
            "updates": [],
            "response_text": response_text,
            "response_mode": "chat",
            "mcp_activity": mcp_activity,
            "raw": {"response_text": response_text},
        }

    try:
        parsed = extract_first_json_object(completion)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=502, detail="Model did not return valid JSON for analysis.") from exc

    summary = parsed.get("summary") or "Analysis completed."
    findings = parsed.get("findings") if isinstance(parsed.get("findings"), list) else []
    updates = parsed.get("updates") if isinstance(parsed.get("updates"), list) else []
    response_text = compose_checklist_response_text(summary, findings)

    return {
        "summary": summary,
        "findings": findings,
        "updates": updates,
        "response_text": response_text,
        "response_mode": "checklist",
        "mcp_activity": mcp_activity,
        "raw": parsed,
    }


@app.post("/api/ai/analyze/stream")
def analyze_stream(payload: AnalyzeRequest) -> StreamingResponse:
    ensure_active_session()
    session.analysis_cancel_requested = False
    evidence_snapshot = collect_user_artifact_snapshot(payload.evidence_path)

    response_mode = normalize_response_mode(payload.response_mode)
    user_enumeration_chat = response_mode == "chat" and is_user_enumeration_request(payload.mcp_orders)

    selected_ids, selected_artifacts = collect_selected_artifacts(
        payload,
        default_to_all=should_default_to_all_artifacts(payload),
    )
    system_prompt, user_prompt, _thinking_mode, response_mode = build_analysis_prompt(
        payload,
        selected_ids,
        selected_artifacts,
        evidence_snapshot=evidence_snapshot,
    )
    mcp_free_text_plan = _build_mcp_plan_from_orders(payload.mcp_orders, payload.evidence_path, payload.execution_target, payload.ioc)
    mcp_artifact_plan: list[dict[str, Any]] = []
    for artifact in selected_artifacts:
        artifact_id = str(artifact.get("id") or "").strip()
        artifact_name = _artifact_display_name(artifact)
        for call in _build_mcp_plan_for_artifact(artifact, payload.evidence_path, payload.execution_target, payload.ioc):
            mcp_artifact_plan.append(
                {
                    "artifact_id": artifact_id,
                    "artifact": artifact_name,
                    "tool": str(call.get("tool") or "").strip(),
                    "reason": str(call.get("reason") or "").strip(),
                    "arguments": call.get("arguments") if isinstance(call.get("arguments"), dict) else {},
                }
            )

    mcp_plan_preview: list[dict[str, Any]] = []
    for call in mcp_free_text_plan:
        mcp_plan_preview.append(
            {
                "artifact_id": "free-text-order",
                "artifact": "MCP free-text order",
                "tool": str(call.get("tool") or "").strip(),
                "reason": str(call.get("reason") or "").strip(),
                "arguments": call.get("arguments") if isinstance(call.get("arguments"), dict) else {},
            }
        )
    mcp_plan_preview.extend(mcp_artifact_plan)

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": json.dumps(user_prompt)},
    ]

    def event_stream():
        completion_chunks: list[str] = []
        final_chunks: list[str] = []
        mcp_activity: dict[str, Any] = {}
        started_at = time.perf_counter()
        mcp_step_events: queue.Queue = queue.Queue()

        def _mcp_step_status_message(step_event: dict[str, Any]) -> str:
            phase = str(step_event.get("phase") or "").strip().lower()
            artifact = str(step_event.get("artifact") or "artifact").strip()
            tool = str(step_event.get("tool") or "unknown-tool").strip()

            if phase == "plan":
                reason = str(step_event.get("reason") or "").strip()
                return f"MCP plan: run {tool} for {artifact}" + (f" ({reason})" if reason else "")

            if phase == "init-start":
                return str(step_event.get("message") or "Initializing MCP server session...")

            if phase == "init-finish":
                if bool(step_event.get("ok", True)):
                    return str(step_event.get("message") or "MCP server session initialized.")
                return str(step_event.get("message") or "MCP initialization failed.")

            if phase == "start":
                reason = str(step_event.get("reason") or "").strip()
                return f"MCP start: {artifact} -> {tool}" + (f" ({reason})" if reason else "")

            if phase == "finish":
                ok = bool(step_event.get("ok"))
                duration = float(step_event.get("duration_seconds") or 0.0)
                if ok:
                    return f"MCP done: {artifact} -> {tool} ok in {duration:.2f}s"
                err = str(step_event.get("error") or "unknown error").strip()
                return f"MCP done: {artifact} -> {tool} failed in {duration:.2f}s ({err})"

            return f"MCP step: {json.dumps(step_event)}"

        try:
            yield sse_event(
                "status",
                {
                    "message": f"Response mode: {response_mode}",
                },
            )

            if user_enumeration_chat:
                users_info = enumerate_users_from_directory(payload.evidence_path)
                mcp_activity = {
                    "enabled": False,
                    "ran": False,
                    "reason": "Skipped MCP tools for focused Users-directory enumeration in chat mode.",
                    "attempted_calls": 0,
                    "successful_calls": 0,
                    "failed_calls": 0,
                    "trace": [
                        {
                            "artifact_id": "free-text-order",
                            "artifact": "Users directory",
                            "tool": "local_users_directory_scan",
                            "ok": bool(users_info.get("exists")),
                            "result_summary": users_info,
                        }
                    ],
                }

                yield sse_event("status", {"message": "Running focused Users-directory enumeration (MCP skipped)..."})
                yield sse_event(
                    "mcp",
                    {
                        "enabled": False,
                        "ran": False,
                        "reason": str(mcp_activity.get("reason") or ""),
                        "attempted_calls": 0,
                        "successful_calls": 0,
                        "failed_calls": 0,
                        "trace": mcp_activity.get("trace") if isinstance(mcp_activity.get("trace"), list) else [],
                    },
                )

                if users_info.get("exists"):
                    names = users_info.get("regular_profiles") if isinstance(users_info.get("regular_profiles"), list) else []
                    response_text = (
                        f"Found {int(users_info.get('count') or 0)} user profile directory(ies) under {users_info.get('users_root')}: "
                        f"{', '.join(str(name) for name in names) if names else '(none)'}"
                    )
                else:
                    response_text = (
                        "I could not find a Users directory at "
                        f"{users_info.get('users_root')}. Provide the mounted Windows root path that contains Users/."
                    )

                yield sse_event(
                    "done",
                    {
                        "summary": "Free-text response generated.",
                        "findings": [],
                        "updates": [],
                        "response_text": response_text,
                        "response_mode": "chat",
                        "mcp_activity": mcp_activity,
                        "raw": {"response_text": response_text, "users": users_info},
                        "duration_seconds": round(time.perf_counter() - started_at, 3),
                    },
                )
                return

            yield sse_event("status", {"message": "Collecting MCP activity..."})
            yield sse_event(
                "status",
                {
                    "message": (
                        "MCP timeouts configured: "
                        f"init={MCP_INITIALIZE_TIMEOUT_SECONDS:.0f}s, "
                        f"request={MCP_REQUEST_TIMEOUT_SECONDS:.0f}s, "
                        f"tool={MCP_TOOL_TIMEOUT_SECONDS:.0f}s"
                    )
                },
            )

            if mcp_plan_preview:
                yield sse_event("status", {"message": f"MCP planned calls: {len(mcp_plan_preview)}"})
                for planned in mcp_plan_preview:
                    step = {
                        "phase": "plan",
                        "artifact_id": planned.get("artifact_id") or "",
                        "artifact": planned.get("artifact") or "",
                        "tool": planned.get("tool") or "",
                        "reason": planned.get("reason") or "",
                        "arguments": planned.get("arguments") if isinstance(planned.get("arguments"), dict) else {},
                    }
                    yield sse_event("mcp-step", step)
                    yield sse_event("status", {"message": _mcp_step_status_message(step)})

            mcp_result_holder: dict[str, Any] = {}
            mcp_error_holder: dict[str, str] = {}

            def _run_mcp() -> None:
                try:
                    mcp_result_holder["value"] = run_mcp_activity_trace(
                        evidence_path=payload.evidence_path,
                        execution_target=payload.execution_target,
                        ioc=payload.ioc,
                        artifacts=selected_artifacts,
                        mcp_orders=payload.mcp_orders,
                        progress_callback=lambda step: mcp_step_events.put(step),
                        should_cancel=is_analysis_cancel_requested,
                    )
                except Exception as mcp_exc:  # pragma: no cover - defensive fallback for stream safety
                    mcp_error_holder["error"] = str(mcp_exc)

            mcp_thread = threading.Thread(target=_run_mcp, daemon=True)
            mcp_started_at = time.perf_counter()
            mcp_thread.start()

            while mcp_thread.is_alive():
                if is_analysis_cancel_requested():
                    yield sse_event("status", {"message": "Cancellation requested, stopping MCP and model analysis..."})

                drained = 0
                while drained < 20:
                    try:
                        step_event = mcp_step_events.get_nowait()
                    except queue.Empty:
                        break
                    else:
                        normalized_step = step_event if isinstance(step_event, dict) else {"message": str(step_event)}
                        yield sse_event("mcp-step", normalized_step)
                        yield sse_event("status", {"message": _mcp_step_status_message(normalized_step)})
                        drained += 1

                elapsed = time.perf_counter() - mcp_started_at
                yield sse_event("status", {"message": f"MCP activity running... {elapsed:.0f}s"})
                time.sleep(1)

            mcp_thread.join(timeout=0)

            while True:
                try:
                    step_event = mcp_step_events.get_nowait()
                except queue.Empty:
                    break
                else:
                    normalized_step = step_event if isinstance(step_event, dict) else {"message": str(step_event)}
                    yield sse_event("mcp-step", normalized_step)
                    yield sse_event("status", {"message": _mcp_step_status_message(normalized_step)})

            if mcp_error_holder.get("error"):
                mcp_activity = {
                    "enabled": bool(session.mcp_command),
                    "ran": False,
                    "reason": f"MCP execution failed: {mcp_error_holder['error']}",
                    "attempted_calls": 0,
                    "successful_calls": 0,
                    "failed_calls": 0,
                    "trace": [],
                }
            else:
                mcp_activity = mcp_result_holder.get("value") if isinstance(mcp_result_holder.get("value"), dict) else {}

            yield sse_event(
                "mcp",
                {
                    "enabled": bool(mcp_activity.get("enabled")),
                    "ran": bool(mcp_activity.get("ran")),
                    "reason": str(mcp_activity.get("reason") or ""),
                    "attempted_calls": int(mcp_activity.get("attempted_calls") or 0),
                    "successful_calls": int(mcp_activity.get("successful_calls") or 0),
                    "failed_calls": int(mcp_activity.get("failed_calls") or 0),
                    "trace": mcp_activity.get("trace") if isinstance(mcp_activity.get("trace"), list) else [],
                },
            )

            messages[1]["content"] = json.dumps({**user_prompt, "mcp_activity": mcp_activity})

            if is_analysis_cancel_requested():
                yield sse_event(
                    "done",
                    {
                        "summary": "Analysis cancelled by user.",
                        "findings": [],
                        "updates": [],
                        "mcp_activity": mcp_activity,
                        "raw": {"cancelled": True},
                        "cancelled": True,
                        "response_mode": response_mode,
                        "duration_seconds": round(time.perf_counter() - started_at, 3),
                    },
                )
                return

            yield sse_event("status", {"message": "Running model analysis..."})

            for token_chunk in lmstudio_stream_chat_tokens(messages, temperature=0.0):
                if is_analysis_cancel_requested():
                    break

                text = str(token_chunk.get("text") or "")
                if not text:
                    continue

                channel = str(token_chunk.get("channel") or "final").strip().lower()
                if channel not in {"thinking", "final"}:
                    channel = "final"

                completion_chunks.append(text)
                if channel == "final":
                    final_chunks.append(text)

                yield sse_event("token", {"text": text, "channel": channel})

            if not completion_chunks:
                # Fallback for backends that do not honor stream=true for a given model.
                yield sse_event("status", {"message": "No streamed tokens received, retrying with non-stream completion..."})
                fallback_completion = lmstudio_chat(messages, temperature=0.0)
                if fallback_completion:
                    completion_chunks.append(fallback_completion)
                    fallback_segments, _fallback_state = split_think_tag_segments(fallback_completion, False)
                    if not fallback_segments:
                        fallback_segments = [{"text": fallback_completion, "channel": "final"}]

                    for segment in fallback_segments:
                        segment_text = str(segment.get("text") or "")
                        segment_channel = str(segment.get("channel") or "final")
                        if not segment_text:
                            continue
                        if segment_channel == "final":
                            final_chunks.append(segment_text)
                        yield sse_event("token", {"text": segment_text, "channel": segment_channel})

            if is_analysis_cancel_requested():
                yield sse_event(
                    "done",
                    {
                        "summary": "Analysis cancelled by user.",
                        "findings": [],
                        "updates": [],
                        "mcp_activity": mcp_activity,
                        "raw": {"cancelled": True},
                        "cancelled": True,
                        "response_mode": response_mode,
                        "duration_seconds": round(time.perf_counter() - started_at, 3),
                    },
                )
                return

            completion = "".join(completion_chunks)
            final_completion = "".join(final_chunks) if final_chunks else completion

            if response_mode == "chat":
                response_text = strip_thinking_markup(final_completion) or final_completion.strip() or "No response generated."
                try:
                    parsed_chat = extract_first_json_object(response_text)
                except json.JSONDecodeError:
                    parsed_chat = None

                if isinstance(parsed_chat, dict) and any(key in parsed_chat for key in ("summary", "findings", "updates")):
                    summary_text = str(parsed_chat.get("summary") or "").strip()
                    finding_lines = parsed_chat.get("findings") if isinstance(parsed_chat.get("findings"), list) else []
                    compact_findings = [str(item).strip() for item in finding_lines if str(item).strip()][:5]
                    response_text = summary_text or "Analysis completed."
                    if compact_findings:
                        response_text = response_text + "\n\nKey points:\n- " + "\n- ".join(compact_findings)

                yield sse_event(
                    "done",
                    {
                        "summary": "Free-text response generated.",
                        "findings": [],
                        "updates": [],
                        "response_text": response_text,
                        "response_mode": "chat",
                        "mcp_activity": mcp_activity,
                        "raw": {"response_text": response_text},
                        "raw_completion": completion,
                        "raw_final_completion": final_completion,
                        "duration_seconds": round(time.perf_counter() - started_at, 3),
                    },
                )
                return

            try:
                parsed = extract_first_json_object(final_completion)
            except json.JSONDecodeError as exc:
                raise HTTPException(status_code=502, detail="Model did not return valid JSON for analysis.") from exc

            summary = parsed.get("summary") or "Analysis completed."
            findings = parsed.get("findings") if isinstance(parsed.get("findings"), list) else []
            updates = parsed.get("updates") if isinstance(parsed.get("updates"), list) else []
            response_text = compose_checklist_response_text(summary, findings)

            yield sse_event(
                "done",
                {
                    "summary": summary,
                    "findings": findings,
                    "updates": updates,
                    "response_text": response_text,
                    "response_mode": "checklist",
                    "mcp_activity": mcp_activity,
                    "raw": parsed,
                    "raw_completion": completion,
                    "raw_final_completion": final_completion,
                    "duration_seconds": round(time.perf_counter() - started_at, 3),
                },
            )
        except HTTPException as exc:
            yield sse_event("error", {"detail": str(exc.detail)})
        except Exception as exc:
            yield sse_event("error", {"detail": f"Unexpected analysis error: {exc}"})

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


