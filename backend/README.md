# Project Management Backend

Lightweight PHP API for AI project analysis using Gemini.

## Environment

Copy `.env.example` to `.env` for local development and set:

- `GEMINI_API_KEY`
- `GEMINI_MODEL` (default: `gemini-2.5-flash`)
- `CORS_ORIGIN`
- `API_BASE_PATH` (default: `/project_management/api`)

## API

- `POST /project-analysis`
  - Body:
    ```json
    {
      "questionnaire": {
        "projectName": "...",
        "projectDescription": "...",
        "stakeholders": []
      }
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "data": {
        "projectCharter": "...",
        "riskAssessment": "...",
        "timelineOverview": "...",
        "stakeholderAnalysis": "..."
      }
    }
    ```

- `GET /health`
