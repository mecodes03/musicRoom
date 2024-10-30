import { cookies } from "next/headers";

const GOOGLE_TOKEN_COOKIE_NAME = "google_token";
const SPOTIFY_TOKEN_COOKIE_NAME = "spotify_token";

export function setSessionTokenCookie(
  token: string,
  expiresAt: Date,
  type: "google" | "spotify"
): void {
  cookies().set(
    type == "google" ? GOOGLE_TOKEN_COOKIE_NAME : SPOTIFY_TOKEN_COOKIE_NAME,
    token,
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    }
  );
}

export function deleteTokenCookie(type: "google" | "spotify"): void {
  cookies().set(
    type == "google" ? GOOGLE_TOKEN_COOKIE_NAME : SPOTIFY_TOKEN_COOKIE_NAME,
    "",
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    }
  );
}

export function getToken(type: "google" | "spotify"): string | undefined {
  return cookies().get(
    type == "google" ? GOOGLE_TOKEN_COOKIE_NAME : SPOTIFY_TOKEN_COOKIE_NAME
  )?.value;
}
