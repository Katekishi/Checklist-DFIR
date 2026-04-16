# DFIR Launcher Daemon

Tiny local launcher service that starts/stops the backend process for the checklist app.

## Run launcher

```bash
cd /home/rem/Desktop/Checklist/launcher
python3 daemon.py
```

Launcher URL:

- `http://127.0.0.1:8790`

Open the app through launcher-served HTTP URL (recommended for Firefox):

- `http://127.0.0.1:8790/dfir-checklist.html`

Do not use `file:///.../dfir-checklist.html` in Firefox for this workflow.

## API

- `GET /api/launcher/health`
- `GET /api/launcher/status`
- `POST /api/launcher/start` with body: `{ "backend_url": "http://127.0.0.1:8787" }`
- `POST /api/launcher/stop`

The backend process logs are written to:

- `/home/rem/Desktop/Checklist/launcher/backend.log`
