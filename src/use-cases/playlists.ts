import { env } from "@/env";
import { YoutubePlaylistById } from "@/types/youtube";

export async function getUserYoutubePlaylistsUseCase(accessToken: string) {
  const url = userYoutubePlaylistsUrl(10);
  const youtubeRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!youtubeRes.ok || youtubeRes.status !== 200 || !youtubeRes) {
    console.log(await youtubeRes.json());
    return { success: false, error: youtubeRes.statusText };
  }

  const youtubePlaylists = (await youtubeRes.json()) as YoutubePlaylistById;
  console.log("youtubePlaylists: \n", youtubePlaylists);

  const ids = youtubePlaylists.items.map((playlist) => playlist.id);
  console.log(ids);

  return ids;
}

export async function getUserSpotifyPlaylistsUseCase(accessToken: string) {
  
}

function userYoutubePlaylistsUrl(maxResult: number, pageToken?: string) {
  return `https://youtube.googleapis.com/youtube/v3/playlists?part=id&part=snippet&mine=true${
    pageToken ? `&pagetoken=${pageToken}` : ""
  }&maxResults=${maxResult}&key=${env.YOUTUBE_API_KEY}`;
}
