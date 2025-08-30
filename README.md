# AI Project Manager

A comprehensive, AI-powered project management tool that helps you create detailed project plans through guided questionnaires and intelligent analysis. This tool generates professional project documentation including charters, risk assessments, timelines, and stakeholder analysis.

## 🚀 Features

### Core Functionality
- **Smart Multi-Step Questionnaire**: Guided 5-step process to capture all project details
- **AI-Powered Analysis**: Generates comprehensive project documentation
- **Multiple Export Formats**: PDF, HTML, CSV, and JSON export options
- **Project Templates**: Pre-filled templates for common project types
- **Real-time Validation**: Instant feedback and error checking

### Enhanced User Experience
- **Auto-Save**: Automatic progress saving every 30 seconds
- **Data Persistence**: Restore your session if you refresh or close the browser
- **Keyboard Navigation**: Use Ctrl+→ and Ctrl+← to navigate steps quickly
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: ARIA labels, keyboard support, and screen reader friendly

### Project Documentation Generated
1. **📋 Project Charter**: Purpose, scope, objectives, and success criteria
2. **⚠️ Risk Assessment**: Identified risks with probability, impact, and mitigation strategies
3. **📅 Timeline Overview**: Project milestones and key deliverable dates
4. **👥 Stakeholder Analysis**: Stakeholder mapping with engagement strategies

## 🛠️ Installation & Setup

### Quick Start
1. Download or clone this repository
2. Open `index.html` in a modern web browser
3. Start creating your project plan!

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd project_management

# Serve locally (optional, for development)
python -m http.server 8000
# or
npx serve .

# Open browser to http://localhost:8000
```

### File Structure
```
project_management/
├── index.html          # Main application file
├── app.js              # JavaScript application logic
├── style.css           # Styling and responsive design
├── test.html           # Quick functionality test
├── README.md           # This documentation
# Project Management — Frontend

This repository contains the frontend for the Project Management app: a Vite + React + TypeScript single-page application used to build and preview project questionnaires, processing, and results export features.

## What this workspace contains

- Framework: Vite + React + TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Animations: Framer Motion
- Charts: Chart.js
- Testing: Vitest + Testing Library
- Linting / Formatting: ESLint + Prettier

Source is under `frontend/src`. Key folders:

- `src/components/` — UI components (layout, project steps, shared UI)
- `src/hooks/` — custom hooks (for example `useProjectData.ts`)
- `src/stores/` — global stores (for example `useProjectStore.ts`)
- `src/data/` — static sample data (`projectData.json`)
- `src/utils/` — utilities (`exporter.ts`, `reportGenerator.ts`, `cn.ts`)
- `src/styles/` — Tailwind / global CSS
- `src/pages/` — route pages (if used)

Example components: `components/project/Landing.tsx`, `Questionnaire.tsx`, `Processing.tsx`, `Results.tsx` and layout components under `components/layout/`.

## Quickstart (frontend)

Open a terminal in `frontend` and install dependencies, then run the dev server.

```powershell
cd frontend
npm install
npm run dev
```

Then open the URL shown by Vite (usually http://localhost:5173).

Build for production:

```powershell
cd frontend
npm run build
```

Preview the production build locally:

```powershell
cd frontend
npm run preview
```

Run the test suite (Vitest):

```powershell
cd frontend
npm test
```

Lint, format and type-check:

```powershell
cd frontend
npm run lint
npm run format
npm run type-check
```

The most useful npm scripts (from `frontend/package.json`):

- `dev` — start Vite dev server
- `build` — run `tsc -b` then `vite build`
- `preview` — preview built output
- `test` / `test:run` — run tests with Vitest
- `lint` — run ESLint
- `format` / `format:check` — Prettier
- `ci` — type-check, lint and run tests (CI helper)

## Project overview

The frontend implements a multi-step flow for creating and processing project data:

- Landing: entry point for starting or loading a project
- Questionnaire: multi-step form to capture project details
- Processing: background processing and report generation
- Results: generated report preview and export options

Data is typically persisted in-memory or browser storage for the current session. Exports are handled by utility modules (`exporter.ts`, `reportGenerator.ts`) which support structured output (JSON/CSV/HTML/PDF depending on the implementation).

## Development notes

- TypeScript project references are used (`tsconfig.json` and `tsconfig.tsbuildinfo`).
- Keep components small and testable; add unit tests in `src/components` or `src/utils` alongside code.
- Use `vitest` + `@testing-library/react` for component tests. Example tests live next to components (e.g. `Button.test.tsx`).

## Troubleshooting

- If the dev server won't start, ensure Node.js (recommended 18+) and npm are installed and that `frontend/node_modules` exists (`npm install`).
- Type errors: run `npm run type-check` to see TypeScript diagnostics.
- Linting: run `npm run lint` and fix reported issues or adjust ESLint configuration in `frontend/eslint.config.js`.

## Contributing

- Fork / branch and open a Pull Request.
- Run existing tests and linters before submitting.
- Update or add tests for new functionality.

## License

See `LICENSE` in the repository root for licensing information (MIT).

---

Last updated: 2025-08-30
