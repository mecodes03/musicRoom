import { ConnectSpotifyButton } from "@/components/ConnectSpotifyButton";
import { ConnectYoutubeButton } from "@/components/ConnectYoutubeButton";
import { buttonVariants } from "@/components/ui/button";
import { getConnectedAccounts } from "@/lib/auth/session";
import { cn } from "@/lib/utils";
import Link from "next/link";

export async function HeaderActions() {
  const connectedAccounts = await getConnectedAccounts();
  console.log(connectedAccounts);

  if (!connectedAccounts)
    return (
      <Link
        href="/connect"
        className={cn(buttonVariants(), "rounded-full text-sm font-normal")}
      >
        connect
      </Link>
    );

  return (
    <div className="flex gap-4">
      {!connectedAccounts.youtube && <ConnectYoutubeButton size="sm" />}
      {!connectedAccounts.spotify && <ConnectSpotifyButton size="sm" />}
    </div>
  );
}
