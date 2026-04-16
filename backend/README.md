# DFIR AI Bridge

This service connects the checklist frontend to a per-session LM Studio model and an optional MCP process.

## 1) Install dependencies

```bash
cd backend
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

## 2) Run the service

```bash
.venv/bin/python -m uvicorn main:app --host 127.0.0.1 --port 8787
```

## Optional: Launcher daemon (recommended for auto-start)

Run once in another terminal:

```bash
cd /home/rem/Desktop/Checklist/launcher
python3 daemon.py
```

Then in the app set:

- Launcher URL default is internal: `http://127.0.0.1:8790`

When backend is offline, `Start Session` will ask the launcher to start it.
`Stop Session` also requests launcher/backend stop.

## 3) Frontend settings

Open the checklist in your browser and go to the `AI Investigator` tab.

- Model (per session): select from dropdown populated from LM Studio models.
- Use `Refresh models` to re-scan available models after downloading new ones.

Other AI settings are fixed to defaults in the background:

- Backend URL: `http://127.0.0.1:8787`
- Launcher URL: `http://127.0.0.1:8790`
- LM Studio URL: `http://127.0.0.1:1234/v1`
- Idle timeout: `20` minutes
- MCP command: `uv run --directory /home/rem/Desktop/Checklist/winforensics-mcp python -m winforensics_mcp.server`

Then click `Start Session`.

## Notes

- On `Start Session`, backend automatically calls LM Studio `POST /api/v1/models/load`.
- On `Stop Session` and idle timeout, backend automatically calls `POST /api/v1/models/unload`.
- The app also requests backend self-shutdown on `Stop Session`.
- For backend self-shutdown behavior, run uvicorn without `--reload`.
- The AI panel shows model memory status in `Model memory: loaded/not loaded`.
- You can run LM Studio headless and keep no model loaded until a session starts.
- `MCP launch command` is optional but recommended for winforensics integration.

## Winforensics MCP (cloned in workspace)

This project expects the repo at:

- `/home/rem/Desktop/Checklist/winforensics-mcp`

Prepare it once:

```bash
cd /home/rem/Desktop/Checklist/winforensics-mcp
uv sync
```

Then use this exact command in the AI panel (`WinForensics MCP launch command`):

```bash
uv run --directory /home/rem/Desktop/Checklist/winforensics-mcp python -m winforensics_mcp.server
```
