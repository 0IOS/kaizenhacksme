export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response;
}

export async function apiJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await apiFetch(path, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }
  return response.json() as Promise<T>;
}

export async function postInquiry(
  data: {
    company: string;
    contactName: string;
    email: string;
    tier: string;
    offering: string;
  }
): Promise<{ success: boolean; inquiry: any }> {
  return apiJson('/api/inquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}