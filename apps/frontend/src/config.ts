export const DEFAULT_HTTP_URL = "http://localhost:3001";
export const DEFAULT_WS_URL = "ws://localhost:3005";

export function getHttpUrl(): string {
  return localStorage.getItem("app_http_url") || DEFAULT_HTTP_URL;
}

export function setHttpUrl(url: string): void {
  localStorage.setItem("app_http_url", url);
}

export function getWsUrl(): string {
  return localStorage.getItem("app_ws_url") || DEFAULT_WS_URL;
}

export function setWsUrl(url: string): void {
  localStorage.setItem("app_ws_url", url);
}
