// lib/auth/session.ts

export const SESSION_COOKIE_NAME = "ohlura_session";

export function getClearSessionHeader(): [string, string] {
  return [
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; ${
      process.env.NODE_ENV === "production" ? "Secure;" : ""
    }`,
  ];
}

export function getSetSessionHeader(token: string): [string, string] {
  return [
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${token}; Path=/; Max-Age=${60 * 60 * 24 * 7}; HttpOnly; SameSite=Lax; ${
      process.env.NODE_ENV === "production" ? "Secure;" : ""
    }`,
  ];
}
