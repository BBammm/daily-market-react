// src/utils/cookie.ts
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return;
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}