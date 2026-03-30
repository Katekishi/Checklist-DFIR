# Checklist-DFIR

Checklist-DFIR is a lightweight, browser-based DFIR workspace for artifact triage and case tracking. It is structured around MITRE tactics, works fully offline, and requires no backend or build step.

## Why this project

During incident response, analysts often need a fast way to track artifact coverage, capture findings, and maintain triage momentum. Checklist-DFIR provides a practical UI for that workflow with local persistence and export support.

## Highlights

- MITRE-driven checklist workflow for artifact review
- Overview dashboard with completion metrics and progress breakdowns
- Fast filtering by tactic, OS, tag, status, and keyword
- Grid and list case views for different analysis styles
- Structured finding insertion for consistent note quality
- Built-in artifact manager to add and edit checklist content
- Local-first design using browser storage
- One-click note export and reset controls
- Keyboard shortcuts for rapid navigation

## Application Views

- Overview: case snapshot, progress bars, active filter counts, recently updated totals, and quick actions
- Cases: searchable checklist with advanced filtering, sorting, and category collapse controls
- Artifact Manager: in-browser create/edit interface for artifacts, MITRE mappings, tags, locations, tools, and guidance

## Quick Start

1. Clone or download this repository.
2. Open `dfir-checklist.html` in any modern browser.
3. Start triaging artifacts and recording findings.

No installation, package manager, or server runtime is required.

## Keyboard Shortcuts

- `/` focus search
- `g` switch to grid view
- `l` switch to list view
- `e` export notes
- `r` open reset dialog
- `?` open shortcuts dialog
- `Esc` close active dialogs

## Data Model and Persistence

- Checklist source data is provided from `assets/checklist-data.js`.
- Interactive logic is handled in `assets/dfir-checklist.js`.
- Styles and responsive layout are defined in `assets/dfir-checklist.css`.
- Analyst state and artifact edits are saved in browser local storage.
- Export notes before changing browser profile or device.

## Project Structure

```text
.
├── dfir-checklist.html
├── README.md
└── assets/
    ├── checklist-data.js
    ├── dfir-checklist.css
    └── dfir-checklist.js
```

## Typical Use Cases

- DFIR artifact triage during active incidents
- Coverage validation in tabletop or lab scenarios
- Analyst handoff with exported notes and status context
- Repeatable personal workflow for forensic review

## Contributing

Contributions are welcome. If you are proposing improvements, focus areas include:

- Additional artifact content and MITRE mappings
- Better export formats and reporting usability
- UI and accessibility enhancements
- Local-first collaboration patterns
