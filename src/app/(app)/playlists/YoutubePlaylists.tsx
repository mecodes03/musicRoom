import { ConnectYoutubeButton } from "@/components/ConnectYoutubeButton";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth/session";
import { getUserYoutubePlaylistsUseCase } from "@/use-cases/playlists";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";

const getYoutubePlaylists = cache(async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/connect");
  if (!currentUser.youtube) throw new Error("Youtube not connected!!!");
  return await getUserYoutubePlaylistsUseCase(currentUser.youtube.accessToken);
});

const YoutubePlaylists = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/connect");
  if (!currentUser.youtube) return <ConnectYoutubeButton />;

  const playlists = await getYoutubePlaylists();
  console.log("youtubePlaylists: ", playlists);

  return (
    <div>
      YoutubePlaylists
      <Link className={buttonVariants()} href="/">
        Home
      </Link>
    </div>
  );
};

export { YoutubePlaylists };
