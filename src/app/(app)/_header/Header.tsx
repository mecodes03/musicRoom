import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderScrollBorder } from "./header-scroll-border";
import { MenuIcon, Settings2Icon } from "lucide-react";
import { ConnectSpotifyButton } from "@/components/ConnectSpotifyButton";
import { ConnectYoutubeButton } from "@/components/ConnectYoutubeButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth/session";
import { getProfileByUserIdUseCase } from "@/use-cases/profiles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutItem } from "./sign-out-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderActionsFallback } from "./header-actions-fallback";

const Header = async () => {
  return (
    <nav className="relative h-full backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 right-0">
        <HeaderScrollBorder className="h-[1px] w-full" />
      </div>

      <div className="flex h-full items-center justify-between py-2 px-2 sm:px-8">
        <div className="flex items-center gap-x-2">
          <MenuIcon className="w-6 h-6 mr-3" scale={0.5} />

          <Link href={"/"}>
            <Image
              height={56}
              width={56}
              className="aspect-auto h-fit w-14 fill-white"
              src="/music.png"
              alt="music logo"
            />
          </Link>
        </div>

        <div className="flex gap-2">
          <Suspense fallback={<HeaderActionsFallback />}>
            <HeaderActions />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export { Header };

async function HeaderActions() {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <Link
        href="/connect"
        className={cn(buttonVariants(), "rounded-full text-sm font-normal")}
      >
        connect
      </Link>
    );

  return (
    <div className="flex gap-4 items-center">
      <Link
        href={"/playlists"}
        className={buttonVariants({
          className: "rounded-[9999px] font-semibold py-5",
          variant: "outline",
        })}
      >
        playlists
      </Link>

      {!currentUser.youtube && <ConnectYoutubeButton size="sm" />}
      {!currentUser.spotify && <ConnectSpotifyButton size="sm" />}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Suspense
            fallback={
              <div className="bg-gray-800 rounded-full h-10 w-10 shrink-0 flex items-center justify-center">
                ..
              </div>
            }
          >
            <ProfileAvatar userId={currentUser.id} />
          </Suspense>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2">
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/settings"
              className="flex gap-2 items-center cursor-pointer"
            >
              <Settings2Icon className="w-4 h-4" /> Settings
            </Link>
          </DropdownMenuItem>
          <SignOutItem />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

async function ProfileAvatar({ userId }: { userId: number }) {
  const profile = await getProfileByUserIdUseCase(userId);

  return (
    <Avatar>
      <AvatarImage src={profile?.image ?? undefined} />
      <AvatarFallback>
        {profile?.displayName?.substring(0, 2).toUpperCase() ?? "AA"}
      </AvatarFallback>
    </Avatar>
  );
}
