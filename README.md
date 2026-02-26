# Project Management

Frontend-first WebHatchery app for guided project planning and report generation.

## Stack

1. React + TypeScript + Vite
2. Tailwind CSS
3. Zustand
4. Vitest + Testing Library

## Structure

```text
project_management/
  .github/workflows/ci.yml
  frontend/
    src/
      api/
      components/
      constants/
      data/
      hooks/
      pages/
      stores/
      styles/
      test/
      types/
      utils/
```

## Local Development

```powershell
cd frontend
npm install
npm run dev
```

## Quality Gates

```powershell
cd frontend
npm run lint
npm run type-check
npm run test:run
npm run build
```

Or run the combined gate:

```powershell
cd frontend
npm run ci
```

## Deployment

From the app root:

```powershell
.\publish.ps1
```

## Notes

1. This app is currently standardized as **frontend-only**.
2. Vite config now safely handles missing mode env files (for example `.env.test`) so tests run reliably in CI/local.
