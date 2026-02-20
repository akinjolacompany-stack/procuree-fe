import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  "http://localhost:3008";

const ACCESS_TOKEN_STORAGE_KEY = "procureefe_access_token";

type ApiLifecycleHandlers = {
  onRequest?: (config: InternalAxiosRequestConfig) => void;
  onResponse?: (response: AxiosResponse) => void;
  onUnauthorized?: (error: AxiosError) => void;
  onForbidden?: (error: AxiosError) => void;
  onNetworkUnavailable?: (error: AxiosError) => void;
  onNetworkAvailable?: () => void;
};

let lifecycleHandlers: ApiLifecycleHandlers = {};
let networkListenersBound = false;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function buildNetworkError(
  message: string,
  config?: InternalAxiosRequestConfig,
): AxiosError {
  return new AxiosError(message, "ERR_NETWORK", config);
}

function readAccessTokenFromStorage(): string | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function attachAuthHeader(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = readAccessTokenFromStorage();
  if (!token) {
    return config;
  }

  config.headers = config.headers ?? {};
  (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  return config;
}

function bindNetworkListeners() {
  if (!isBrowser() || networkListenersBound) {
    return;
  }

  window.addEventListener("online", () => {
    lifecycleHandlers.onNetworkAvailable?.();
  });

  window.addEventListener("offline", () => {
    lifecycleHandlers.onNetworkUnavailable?.(
      buildNetworkError("Network unavailable. Please check your internet connection."),
    );
  });

  networkListenersBound = true;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    bindNetworkListeners();

    if (isBrowser() && !window.navigator.onLine) {
      const offlineError = buildNetworkError(
        "Network unavailable. Please check your internet connection.",
        config,
      );
      lifecycleHandlers.onNetworkUnavailable?.(offlineError);
      return Promise.reject(offlineError);
    }

    const nextConfig = attachAuthHeader(config);
    lifecycleHandlers.onRequest?.(nextConfig);
    return nextConfig;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    lifecycleHandlers.onResponse?.(response);
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      clearApiAccessToken();
      lifecycleHandlers.onUnauthorized?.(error);
    } else if (status === 403) {
      clearApiAccessToken();
      lifecycleHandlers.onForbidden?.(error);
    } else if (error.code === "ERR_NETWORK" || !error.response) {
      lifecycleHandlers.onNetworkUnavailable?.(error);
    }

    return Promise.reject(error);
  },
);

export function configureApiLifecycleHandlers(handlers: Partial<ApiLifecycleHandlers>) {
  lifecycleHandlers = {
    ...lifecycleHandlers,
    ...handlers,
  };
}

export function setApiAccessToken(token: string) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
}

export function getApiAccessToken(): string | null {
  return readAccessTokenFromStorage();
}

export function clearApiAccessToken() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function isApiNetworkAvailable(): boolean {
  return !isBrowser() || window.navigator.onLine;
}

export const apiConfig = {
  baseURL: API_BASE_URL,
  accessTokenStorageKey: ACCESS_TOKEN_STORAGE_KEY,
} as const;
