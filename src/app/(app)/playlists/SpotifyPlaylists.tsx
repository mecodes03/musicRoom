"use client";

import { useQuery } from "@tanstack/react-query";
import { getSpotifyPlaylistsAction } from "./playlists-actions";

const SpotifyPlaylists = () => {
  const { data } = useQuery({
    queryKey: ["spotify-playlists"],
    queryFn: async () => await getSpotifyPlaylistsAction({ max: 10 }),
  });

  console.log(data);

  return <div>SpotifyPlaylist</div>;
};

export { SpotifyPlaylists };
