@AGENTS.md
Operational commands, strict architectural guardrails, and project standards for the **GEO Tool** repository.

---

## Core Commands

### Development & Workflows
* **Local Development Server:** `npm run dev`
* **Production Application Build:** `npm run build`
* **Code Quality / ESLint Check:** `npm run lint`

### Working with Modules
* **Enable ES Modules on Backend:** `npm pkg set type=module` (Run directly inside the backend root folder containing your `package.json`).

---

## Code Style & Architecture Guardrails

### 1. Language & Framework Rules
* **Strict TypeScript Only:** Absolutely no vanilla JavaScript (`.js`, `.jsx`) allowed. Every variable, function parameter, component prop, and API response payload must be strictly and explicitly typed.
* **Next.js Conventions:** Utilize the App Router architecture (`src/app/`). Interactive frontend UI components must explicitly contain the `'use client'` directive at the very top of the file where runtime state or browser-only hooks are executed.

### 2. Strict Styling Guidelines
* **Zero Inline Styles:** Never use the `style={{ ... }}` attribute within any UI component layer.
* **Enforced CSS Modules:** All layout positions, visual treatments, typography specifications, and color properties must be entirely isolated into dedicated CSS Module files (`*.module.css`).
* **Dynamic Style Adaptation:** Pass visual modifications cleanly by querying imported modular class configurations conditionally based on state or values (e.g., dynamic audit scores):