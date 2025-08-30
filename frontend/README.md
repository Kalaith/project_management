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
- Simple rule-based analysis in `src/utils/reportGenerator.ts`.
- JSON export utility in `src/utils/exporter.ts`.

Next steps

- Improve AI analysis by integrating an API or an LLM SDK.
- Add tests and type refinements.
- Expand the UI and polish styles.
