import "server-only";

import { AuthenticationError } from "../../app/util";
import { createSession, generateSessionToken, validateRequest } from "./auth";
import { cache } from "react";
import { cookies } from "next/headers";
import { UserId } from "../../data-access/types";
import { env } from "../../env";

const SESSION_COOKIE_NAME = "session";

export function setSessionTokenCookie(token: string, expiresAt: Date): void {
  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export function deleteSessionTokenCookie(): void {
  cookies().set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export function getSessionToken(): string | undefined {
  return cookies().get(SESSION_COOKIE_NAME)?.value;
}

export const getCurrentUser = cache(async () => {
  const { user } = await validateRequest();
  return user ?? undefined;
});

export const getConnectedAccounts = cache(async () => {
  const { session } = await validateRequest();
  console.log(session);

  return session
    ? {
        spotify: session.spotifyAccessToken ?? null,
        youtube: session.googleAccessToken ?? null,
      }
    : undefined;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};

export async function setSession({
  userId,
  googleAccessToken,
  googleAccessTokenExpiresAt,
  googleRefreshToken,
  spotifyAccessToken,
  spotifyAccessTokenExpiresAt,
  spotifyRefreshToken,
}: {
  userId: UserId;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  googleAccessTokenExpiresAt?: Date;
  spotifyAccessToken?: string;
  spotifyRefreshToken?: string;
  spotifyAccessTokenExpiresAt?: Date;
}) {
  const token = generateSessionToken();
  const session = await createSession(
    token,
    userId,
    googleAccessToken,
    googleRefreshToken,
    googleAccessTokenExpiresAt,
    spotifyAccessToken,
    spotifyRefreshToken,
    spotifyAccessTokenExpiresAt
  );
  setSessionTokenCookie(token, session.expiresAt);
}
