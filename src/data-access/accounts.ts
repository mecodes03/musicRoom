import { database } from "../db";
import { accounts } from "../db/schema";
import { UserId } from "./types";
import { and, eq } from "drizzle-orm";

export async function linkSpotifyAccount(
  userId: UserId,
  email: string,
  spotifyId: string
) {
  await database
    .insert(accounts)
    .values({
      userId: userId,
      accountType: "spotify",
      email: email,
      spotifyId,
    })
    .onConflictDoNothing()
    .returning();
}

export async function linkGoogleAccount(
  userId: UserId,
  email: string,
  googleId: string
) {
  await database
    .insert(accounts)
    .values({
      userId: userId,
      accountType: "google",
      email,
      googleId,
    })
    .onConflictDoNothing()
    .returning();
}

export async function getUserAccounts(userId: UserId) {
  return await database.query.accounts.findMany({
    where: eq(accounts.userId, userId),
  });
}

export async function getAccountByGoogleId(googleId: string) {
  return await database.query.accounts.findFirst({
    where: eq(accounts.googleId, googleId),
  });
}

export async function getAccountBySpotifyId(spotifyId: string) {
  return await database.query.accounts.findFirst({
    where: eq(accounts.spotifyId, spotifyId),
  });
}

export async function getGoogleAccountByEmail(email: string) {
  return await database.query.accounts.findFirst({
    where: and(eq(accounts.email, email), eq(accounts.accountType, "google")),
  });
}

export async function getSpotifyAccountByEmail(email: string) {
  return await database.query.accounts.findFirst({
    where: and(eq(accounts.email, email), eq(accounts.accountType, "spotify")),
  });
}
