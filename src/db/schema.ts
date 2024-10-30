import {
  index,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const accountTypeEnum = pgEnum("type", ["google", "spotify"]);

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    id: serial("id").primaryKey(),
    userId: serial("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountType: accountTypeEnum("account_type").notNull(),
    googleId: text("google_id").unique(),
    spotifyId: text("spotify_id").unique(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    userIdAccountTypeIdx: index("user_id_account_type_idx").on(
      table.userId,
      table.accountType
    ),
  })
);

export const profiles = pgTable("profile", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  displayName: text("display_name"),
  googleUserName: text("google_user_name"),
  spotifyUserName: text("spotify_user_name"),
  googleUserImage: text("google_user_image"),
  spotifyUserImage: text("spotify_user_image"),
  imageId: text("image_id"),
  image: text("image"),
  bio: text("bio").notNull().default(""),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),

  googleAccessToken: text("google_access_token"),
  googleRefreshToken: text("google_refresh_token"),
  googleAccessTokenExpiresAt: timestamp("google_access_token_expires_at", {
    withTimezone: true,
    mode: "date",
  }),

  spotifyAccessToken: text("spotify_access_token"),
  spotifyRefreshToken: text("spotify_refresh_token"),
  spotifyAccessTokenExpiresAt: timestamp("spotify_access_token_expires_at", {
    withTimezone: true,
    mode: "date",
  }),
});

export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;

export type Session = typeof sessions.$inferSelect;
