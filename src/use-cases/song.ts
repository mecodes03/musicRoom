import { UserSession } from "@/lib/auth/session";

export async function getYoutubeSongByVideoIdUseCase(
  authenticatedUser: UserSession,
  {}: { playlistId: string }
) {}

export async function getSpotifySongByVideoIdUseCase(
  authenticatedUser: UserSession,
  {}: { playlistId: string }
) {}
