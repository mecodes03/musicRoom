import { Google, Spotify } from "arctic";
import { database } from "../../db";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { Session, sessions, User, users } from "../../db/schema";
import { env } from "../../env";
import { eq } from "drizzle-orm";
import { sha256 } from "@oslojs/crypto/sha2";
import { getSessionToken } from "./session";
import { UserId } from "../../data-access/types";

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15;
const TOKEN_REFRESH_INTERVAL_MS = 1000 * 60 * 30;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URL
);

export const spotify = new Spotify(
  env.SPOTIFY_CLIENT_ID,
  env.SPOTIFY_CLIENT_SECRET,
  env.SPOTIFY_REDIRECT_URL
);

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number,
  googleAccessToken?: string,
  googleRefreshToken?: string,
  googleAccessTokenExpiresAt?: Date,
  spotifyAccessToken?: string,
  spotifyRefreshToken?: string,
  spotifyAccessTokenExpiresAt?: Date
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  await database.delete(sessions).where(eq(sessions.userId, userId));

  const session = await database
    .insert(sessions)
    .values({
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
      googleAccessToken,
      googleRefreshToken,
      googleAccessTokenExpiresAt,
      spotifyAccessToken,
      spotifyRefreshToken,
      spotifyAccessTokenExpiresAt,
    })
    .returning();
  return session[0];
}

export async function validateRequest(): Promise<SessionValidationResult> {
  const sessionToken = getSessionToken();
  if (!sessionToken) {
    return { session: null, user: null };
  }

  return validateSessionToken(sessionToken);
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const sessionInDb = await database.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
  });

  if (!sessionInDb) {
    return { session: null, user: null };
  }

  if (Date.now() >= sessionInDb.expiresAt.getTime()) {
    await database.delete(sessions).where(eq(sessions.id, sessionInDb.id));
    return { session: null, user: null };
  }

  if (!sessionInDb.googleAccessToken && !sessionInDb.spotifyAccessToken) {
    return { user: null, session: null };
  }

  if (
    sessionInDb.googleAccessToken &&
    sessionInDb.googleRefreshToken &&
    sessionInDb.googleAccessTokenExpiresAt
  ) {
    // token expired or about to expire, then refresh.
    if (
      Date.now() >= sessionInDb.googleAccessTokenExpiresAt.getTime() ||
      Date.now() >=
        sessionInDb.googleAccessTokenExpiresAt.getTime() -
          TOKEN_REFRESH_INTERVAL_MS
    ) {
      const tokens = await google.refreshAccessToken(
        sessionInDb.googleRefreshToken
      );

      await database
        .update(sessions)
        .set({
          googleAccessToken: tokens.accessToken,
          googleAccessTokenExpiresAt: tokens.accessTokenExpiresAt,
        })
        .where(eq(sessions.id, sessionInDb.id));
    }
  }

  if (
    sessionInDb.spotifyAccessToken &&
    sessionInDb.spotifyRefreshToken &&
    sessionInDb.spotifyAccessTokenExpiresAt
  ) {
    // token expired.
    if (
      Date.now() >= sessionInDb.spotifyAccessTokenExpiresAt.getTime() ||
      Date.now() >=
        sessionInDb.spotifyAccessTokenExpiresAt.getTime() -
          TOKEN_REFRESH_INTERVAL_MS
    ) {
      const tokens = await spotify.refreshAccessToken(
        sessionInDb.spotifyRefreshToken
      );

      await database
        .update(sessions)
        .set({
          spotifyAccessToken: tokens.accessToken,
          spotifyAccessTokenExpiresAt: tokens.accessTokenExpiresAt,
          spotifyRefreshToken: tokens.refreshToken,
        })
        .where(eq(sessions.id, sessionInDb.id));
    }
  }

  const user = await database.query.users.findFirst({
    where: eq(users.id, sessionInDb.userId),
  });

  if (!user) {
    await database.delete(sessions).where(eq(sessions.id, sessionInDb.id));
    return { session: null, user: null };
  }

  if (
    Date.now() >=
    sessionInDb.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS
  ) {
    sessionInDb.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
    await database
      .update(sessions)
      .set({
        expiresAt: sessionInDb.expiresAt,
      })
      .where(eq(sessions.id, sessionInDb.id));
  }

  return { session: sessionInDb, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await database.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function invalidateUserSessions(userId: UserId): Promise<void> {
  await database.delete(sessions).where(eq(users.id, userId));
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
