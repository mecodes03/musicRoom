import Image from "next/image";
import { ConnectYoutubeButton } from "@/components/ConnectYoutubeButton";
import { ConnectSpotifyButton } from "@/components/ConnectSpotifyButton";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex fixed w-full top-0 h-screen bg-background">
      {/* Left side - Image */}

      <div className="hidden relative lg:flex w-1/2 bg-gradient-to-br from-background to-primary-foreground dark:from-muted dark:to-background items-center justify-center">
        <Link href="/">
          <Image
            className="absolute top-6 left-6"
            src={"/music.png"}
            height={80}
            width={80}
            alt="music"
          />
        </Link>

        <div className="max-w-md text-center">
          <h1 className="mb-3 text-5xl text-primary font-extrabold">
            Welcome to The MusicRoom
          </h1>

          <p className="font-semibold text-muted-foreground">
            Connect your music accounts and access all your MUSIC in one place.
          </p>
        </div>
      </div>

      {/* Right side - Login form */}

      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="mt-6 text-4xl font-extrabold">Join MusicRoom</h1>

            <p className="mt-2 text-sm text-muted-foreground font-semibold">
              Connect your music accounts to get started
            </p>
          </div>

          <div className="w-full grid gap-4">
            <ConnectYoutubeButton
              className="w-full"
              variant={"secondary"}
              size="lg"
            />
            <ConnectSpotifyButton
              className="w-full"
              variant={"outline"}
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
