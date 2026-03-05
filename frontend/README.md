# Frontend (React + TypeScript)

This directory contains a Vite + React + TypeScript frontend converted from a static HTML prototype.

Quick start

```powershell
cd frontend; npm install; npm run dev
```

What's included

- React + TypeScript app scaffolded to follow WebHatchery frontend standards.
- Tailwind CSS used for styling (see `src/styles/globals.css`).
- Zustand store at `src/stores/useProjectStore.ts` with persistence.
- Gemini-backed analysis via backend API (`POST /project-analysis`).
- Prompt fallback utility in `src/utils/reportGenerator.ts` for resilience.
- JSON export utility in `src/utils/exporter.ts`.

Next steps

- Add tests and type refinements.
- Expand the UI and polish styles.
