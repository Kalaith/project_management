# Project Management

WebHatchery app for guided project planning and AI-powered report generation.

## Stack

1. React + TypeScript + Vite (frontend)
2. PHP (backend API)
3. Gemini API for analysis
4. Tailwind CSS + Zustand
5. Vitest + Testing Library

## Structure

```text
project_management/
  .github/workflows/ci.yml
  backend/
    public/
    src/
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

Backend API:

```powershell
cd backend
copy .env.example .env
# set GEMINI_API_KEY in .env
php -S localhost:8000 public/index.php
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

1. Frontend uses `VITE_API_URL` to call the backend endpoint `POST /project-analysis`.
2. Vite config safely handles missing mode env files (for example `.env.test`) so tests run reliably in CI/local.
