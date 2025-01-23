import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { SpotifyPlaylists } from "./SpotifyPlaylists";
import { YoutubePlaylists } from "./YoutubePlaylists";
import { Suspense } from "react";
import { ErrorPlaylists } from "./PlaylistsError";

export default async function Playlists() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/connect");
  return (
    <div className="mx-auto max-w-7xl pt-6 px-4">
      <div className="grid space-y-8 mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          Spotify Playlists
        </h1>

        <ErrorPlaylists>
          <Suspense fallback={<p>Fetching Spotify playlists...</p>}>
            <SpotifyPlaylists />
          </Suspense>
        </ErrorPlaylists>
      </div>

      <div className="grid space-y-8">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          Youtube Playlists
        </h1>

        <ErrorPlaylists>
          <Suspense fallback={<p>Fetching Youtube playlists</p>}>
            <YoutubePlaylists />
          </Suspense>
        </ErrorPlaylists>
      </div>
    </div>
  );
}
