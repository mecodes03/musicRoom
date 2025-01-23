import { UserSession } from "@/lib/auth/session";

export async function getYoutubePlaylistByPlaylistIdUseCase(
  authenticatedUser: UserSession,
  {}: { playlistId: string }
) {}

export async function getSpotifyPlaylistByPlaylistIdUseCase(
  authenticatedUser: UserSession,
  {}: { playlistId: string }
) {}
