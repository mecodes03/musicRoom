import "server-only";

import { AuthenticationError } from "@/app/util";
import { createSession, generateSessionToken, validateRequest } from "./auth";
import { cache } from "react";
import { cookies } from "next/headers";
import { UserId } from "@/data-access/types";
import { env } from "@/env";

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

export type UserSession = {
  youtube: {
    accessToken: string;
  } | null;
  spotify: {
    accessToken: string;
  } | null;
  id: UserId;
  createdAt: Date;
};

export const getCurrentUser = cache(
  async (): Promise<UserSession | undefined> => {
    console.log("getting current user");
    const { user, session } = await validateRequest();

    return user
      ? {
          ...user,
          youtube: session.googleAccessToken
            ? { accessToken: session.googleAccessToken }
            : null,
          spotify: session.spotifyAccessToken
            ? { accessToken: session.spotifyAccessToken }
            : null,
        }
      : undefined;
  }
);

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
