const baseApiUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

interface ApiErrorResponse {
  success: false;
  message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

function buildUrl(path: string): string {
  if (path.startsWith('/')) {
    return `${baseApiUrl}${path}`;
  }
  return `${baseApiUrl}/${path}`;
}

export async function postJson<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!payload || typeof payload !== 'object' || !('success' in payload)) {
    throw new Error('Invalid API response');
  }

  if (!response.ok) {
    if (payload.success === false) {
      throw new Error(payload.message || 'Request failed');
    }
    throw new Error(`Request failed with status ${response.status}`);
  }

  return payload;
}
