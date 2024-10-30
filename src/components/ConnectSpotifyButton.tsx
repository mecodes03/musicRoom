import { cn } from "@/lib/utils";
import { SpotifyLogo } from "./SpotifyLogo";
import { Button, ButtonProps } from "./ui/button";
import { ClassValue } from "clsx";

export const ConnectSpotifyButton = ({
  className,
  variant = "secondary",
  size,
}: {
  variant?: ButtonProps["variant"];
  className?: ClassValue;
  size?: ButtonProps["size"];
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-6 py-8 overflow-hidden group",
        "transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95",
        className
      )}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-300 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <div className="relative z-10 flex items-center gap-3 text-white">
        <SpotifyLogo
          height={24}
          width={24}
          className="transition-transform duration-200 ease-in-out transform group-hover:rotate-12"
        />
        <span className="text-sm font-bold tracking-wide">
          Connect to Spotify
        </span>
      </div>
    </Button>
  );
};
