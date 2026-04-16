# Data-Driven Checklist Web Applications

**Purpose**: Build and maintain data-driven, browser-based checklist/dashboard applications with consistent styling, accessible UI interactions, smooth animations, and persistent state management. Optimized for DFIR artifact triage but applicable to any checklist, inventory, or triage interface.

**Domains**: Forensic incident response, security checklists, compliance audits, task management, or any multi-item review interface with filtering, state tracking, and export needs.

---

## Core Workflow

### 1. **Data-Driven Rendering**
- All checklist items sourced from an external data file (e.g., `assets/checklist-data.js` array of objects)
- Organize items into logical groupings (e.g., by category/tactic); derive filtering options dynamically from available groups
- Support multiple **view layouts** (grid, list, table) without duplicating data
- Track item state (checked, commented, status) without losing underlying data
- Render sections dynamically based on filtered/visible items

### 2. **Design System & Theming**
- **CSS Variables** in `:root` define the complete palette:
  - Colors: `--text`, `--muted`, `--primary`, `--primary-strong`, `--primary-soft`, `--danger`, `--warning`
  - Surfaces: `--bg`, `--surface`, `--surface-muted`, `--surface-border` (with opacity variants)
  - Shadows: `--shadow`, `--shadow-soft`, `--shadow-glow`
  - Radii: `--radius-lg`, `--radius-md`, `--radius-sm`
  - **Motion timing**: `--motion-fast` (0.18s), `--motion-base` (0.28s), `--motion-slow` (0.46s), `--motion-detail` (0.56s), `--motion-page` (0.72s)
  - **Easing curves**: `--ease-standard` (cubic-bezier(0.22, 1, 0.36, 1)), `--ease-emphasis` (cubic-bezier(0.2, 0.9, 0.24, 1))
- **Never hardcode colors, spacing, or timing values**—always reference CSS variables to maintain consistency across all UI elements
- Apply background animations (gradient drift, grid) subtly to avoid distraction from content

### 3. **Animation & Transition Strategy**
- Use **consistent motion timing** for related interactions (overlay opens: `var(--motion-detail)`, detail expand: `var(--motion-detail)`, flash on update: `0.22s`)
- Overlay transitions: Use backdrop opacity + panel scale/slide with proper z-indexing
- Focus management: Store `lastFocusedElement` before opening modals; restore focus on close
- Cleanup timers: Clear any transition timers (`overlayCloseTimer`, etc.) to prevent memory leaks
- Card updates: Flash effect (`cardUpdateFlashMs: 220`) on state change (found/commented toggle)

### 4. **State Management**
- Persist user progress to `localStorage` under a versioned key (e.g., `dfir-checklist-state-v1`)
- Store two types of state:
  - **entries**: Object mapping artifact IDs to `{ found: boolean, comment: string }`
  - **viewMode**: `"grid"` or `"list"`
- Load state safely with try-catch; default to empty state if corrupted
- Update localStorage immediately after any state change (`saveState()` call)
- Provide **Export** button to download notes as JSON/CSV for external analysis
- Include **Reset** button with confirmation dialog to clear all progress

### 5. **Filtering & Search**
- **Search Input**: Filter items by keyword across all text fields (case-insensitive fuzz matching is optional)
- **Category/Group Dropdown**: Dynamically populated from data; option to show "All categories"
- **Status Filter**: At minimum, support "All items", "Completed only", "Pending only" (customize based on domain)
- Update visible item count and empty-state message dynamically based on filter results
- Combine all filters AND-style (item must match search AND category AND status)
- For DFIR use case, replace "category" with "MITRE Tactic" and "status" with "Found/Commented/Pending"

### 6. **View Modes (Flexible Layout)**
- Support **multiple layout modes** (e.g., Grid, List, Table, Kanban) for the same data
- Apply a **single source of truth** for item data; layout differences only change presentation
- Toggle buttons include `aria-pressed` state; apply `is-active` class to indicate current mode
- Store view preference in state; persist across sessions
- All views show identical data; only CSS layout changes
- Consider responsive design: switch view modes automatically on mobile or allow user override

### 7. **Modal/Overlay Interactions**
- Clicking an item opens a **detailed view** overlay with:
  - Full item details (all relevant fields from data)
  - Edit capability (notes, comments, metadata)
  - Actions (delete, mark, export, etc. as needed)
  - Close button (ESC key also closes)
- Overlay uses **backdrop** with opacity and subtle darkening
- Proper **accessibility**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="overlayTitle"`
- **Focus trap**: Tab stays within overlay while open; restore focus to triggering element on close
- Smooth open/close animations using consistent motion timing from CSS variables
- Clear any queued close timers to prevent race conditions or stale state

### 8. **Summary & Progress Tracking**
- **Header/Info section** displays:
  - Total item count
  - Total grouping/category count
  - Feature availability (e.g., "Local storage enabled", "Cloud sync pending")
- **Progress Panel** shows real-time stats:
  - Items in primary state (e.g., marked complete, found, assigned)
  - Items in secondary state (e.g., with notes/comments)
  - Overall completion % (primary + secondary / total)
  - Currently visible items (post-filter)
- Update stats live whenever state changes or filters update
- For DFIR: Display (found count, commented count, completion %, visible count)

### 9. **Accessibility Requirements**
- All interactive elements must have:
  - **Semantic HTML**: `<button>`, `<label>`, `<input>`, etc.
  - **ARIA attributes**: `aria-label`, `aria-pressed`, `aria-live="polite"` on sections that update
  - **Focus management**: Visible focus rings, outline styles
  - **Color contrast**: Ensure text meets WCAG AA minimums (already in color palette)
  - **Keyboard navigation**: All controls accessible via Tab + Enter/Space
- Form labels linked to inputs via `for` attribute
- Use `aria-hidden="true"` on decorative SVGs/icons

### 10. **Code Organization**
- **HTML**: Single page with semantic sections (hero, toolbar, sections, overlay, dialogs)
- **JavaScript**:
  - Initialize DOM references at top
  - Pure functions for state management (`loadState`, `saveState`, `getEntry`)
  - Rendering function (`render()`) regenerates all visible content
  - Event listeners for search, filters, buttons, overlays
  - Utility functions for HTML escaping, ROT13 decoding (for UserAssist), etc.
- **CSS**:
  - Organize by component (page, hero, toolbar, card, overlay, button, field)
  - Use `data-view="grid/list"` selector to toggle layout
  - Minimize media queries; prefer flexible grid/flex layouts
  - Animations use named `@keyframes` with descriptive names (e.g., `backgroundShift`, `gridDrift`)

---

## Quality Checklist (Must-Have Before Commit)

- [ ] **All colors/spacing/timing use CSS variables** (no hardcoded hex/px/ms)
- [ ] **Overlay opens/closes with smooth animation** matching `--motion-detail` timing
- [ ] **Focus is managed**: stored before open, restored on close
- [ ] **No memory leaks**: all timers cleared, event listeners cleaned up
- [ ] **State persists**: localStorage updates on every change, loads on init
- [ ] **Filters work together**: search + status + MITRE all AND-combined
- [ ] **Both grid/list views render identically** (layout only changes)
- [ ] **Summary counts update live** when state/filters change
- [ ] **Empty state message shown** when no artifacts match filters
- [ ] **Accessibility**: all interactive elements keyboard/ARIA-compatible
- [ ] **Export button produces valid JSON** with all artifact data + notes
- [ ] **Reset button requires confirmation** before clearing localStorage
- [ ] **Desktop/mobile responsive** (min width works, flex wraps gracefully)

---

## Example Tasks & Prompts

**Add a new UI feature** (DFIR example):  
*"Add a keyboard shortcut cheat sheet overlay to the checklist. Use the existing overlay animation system and ensure focus management. Follow the motion timing and color palette from the CSS variables."*

**Fix styling inconsistency** (General template):  
*"The primary action button styling doesn't match the secondary button in the toolbar. Review both button classes and ensure they use consistent CSS variables for colors, padding, and hover states."*

**Enhance filtering** (General template):  
*"Add a new filter criterion to the toolbar (e.g., tag-based, priority-based, assigned-to). Integrate it with existing filters: all queries must combine AND-style."*

**Optimize performance** (General template):  
*"The render() function regenerates all sections every time. Profile the checklist with 500+ items and optimize rendering for layout-view updates without losing animations."*

**Add export functionality** (General template):  
*"Implement an export button that downloads all items + selected metadata as JSON. Include filters: 'All items', 'Visible only', 'Completed only', 'With notes only'."*

---

## Related Customizations

Consider pairing this skill with:
- **Data Source Expansion**: Script to ingest data from external APIs/databases and auto-generate checklist rows
- **Custom Export Templates**: JSON/CSV/Markdown/PDF exporters for specialized report formats
- **Keyboard Shortcut System**: Global shortcuts for toggle state, cycle views, open details, etc.
- **Collaboration Features**: Real-time sync via WebSockets or Cloud API for shared checklists
- **Advanced Analytics**: Charts, heatmaps, or progress trends for large datasets
