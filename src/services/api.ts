const API_BASE_URL = "http://localhost:5000/api";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {

const headers: Record<string, string> = {
  ...(options?.headers as Record<string, string> || {}),
};

  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status}`
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {

  get: <T>(url: string) =>
    request<T>(url),

  post: <T>(
    url: string,
    data: unknown
  ) =>
    request<T>(url, {
      method: "POST",
      body:
        data instanceof FormData
          ? data
          : JSON.stringify(data),
    }),

  put: <T>(
    url: string,
    data: unknown
  ) =>
    request<T>(url, {
      method: "PUT",
      body:
        data instanceof FormData
          ? data
          : JSON.stringify(data),
    }),

  delete: <T>(url: string) =>
    request<T>(url, {
      method: "DELETE",
    }),

};