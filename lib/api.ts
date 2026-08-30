const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("bhoomigo_access_token");
}

export function saveTokens(access: string, refresh: string) {
  localStorage.setItem("bhoomigo_access_token", access);
  localStorage.setItem("bhoomigo_refresh_token", refresh);
}

export function clearTokens() {
  localStorage.removeItem("bhoomigo_access_token");
  localStorage.removeItem("bhoomigo_refresh_token");
}

export async function apiRequest<T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {}
): Promise<{ ok: boolean; status: number; data: T }> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (options.auth) {
    const token = getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
