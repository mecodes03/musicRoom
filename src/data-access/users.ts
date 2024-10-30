import { database } from "../db";
import { accounts, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { UserId } from "./types";

export async function getUser(userId: UserId) {
  const user = await database.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
}

export const createUser = async () => {
  const [user] = await database.insert(users).values({}).returning();
  return user;
};

export const deleteUser = async (userId: UserId) => {
  await database.delete(users).where(eq(users.id, userId)).returning();
};

export async function getUserByEmail(email: string) {
  const result = await database
    .select({
      user: users,
    })
    .from(accounts)
    .innerJoin(users, eq(accounts.userId, users.id))
    .where(eq(accounts.email, email));

  return result.length ? result[0].user : undefined;
}
