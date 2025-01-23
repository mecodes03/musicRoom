"use server";

import { authenticatedAction } from "@/lib/safe-actions";
import { playlistsSchema } from "./validation";

export const getSpotifyPlaylistsAction = authenticatedAction
  .createServerAction()
  .input(playlistsSchema)
  .handler(async ({ ctx: { user } }) => {
    if (!user.spotify) {
      throw new Error("Spotify Not Connected!!");
    }
    console.log(user.spotify.accessToken);
  });

export const getYoutubePlaylistsAction = authenticatedAction
  .createServerAction()
  .input(playlistsSchema)
  .handler(async ({ ctx: { user } }) => {
    await new Promise((res) => setTimeout(() => res(1), 3000));
    if (!user.youtube) {
      throw new Error("Youtube Not Connected!!");
    }
    console.log(user.youtube.accessToken);
  });
