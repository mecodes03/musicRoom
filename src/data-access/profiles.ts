import { eq } from "drizzle-orm";
import { database } from "../db";
import { profiles } from "../db/schema";
import { UserId } from "./types";

export async function createProfile(
  userId: UserId,
  displayName: string,
  image?: string
) {
  const [profile] = await database
    .insert(profiles)
    .values({
      userId,
      image,
      displayName,
    })
    .onConflictDoNothing()
    .returning();
  return profile;
}

export async function getProfileByUserId(userId: UserId) {
  return await database.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });
}
