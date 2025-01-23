"use client";

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
        "relative flex items-center gap-2 rounded-full overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-800 hover:border hover:border-green-400",
        {
          "px-6 py-8": size === "lg",
          "px-4 py-2": size === "sm",
          "border border-transparent": variant !== "outline",
        },
        className
      )}
    >
      <div className="flex items-center gap-2 text-white">
        <SpotifyLogo
          height={38}
          width={38}
          className="rounded-full h-7 w-7 transition-colors duration-300 group-hover:border group-hover:border-green-400"
        />
        <span className="text-sm font-semibold">Connect Spotify</span>
      </div>
    </Button>
  );
};
