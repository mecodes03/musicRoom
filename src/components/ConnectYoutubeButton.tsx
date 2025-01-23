"use client";

import { ClassValue } from "clsx";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { YoutubeLogo } from "./YoutubeLogo";

export const ConnectYoutubeButton = ({
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
        "relative flex items-center gap-2 rounded-full overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-gradient-to-r hover:from-red-300 hover:to-red-800 hover:border hover:border-red-400",
        {
          "px-6 py-8": size === "lg",
          "px-4 py-2": size === "sm",
          "border border-transparent": variant !== "outline",
        },
        className
      )}
    >
      <div className="flex items-center gap-2 text-white">
        <YoutubeLogo
          height={38}
          width={38}
          className="rounded-full h-7 w-7 transition-colors duration-300"
        />
        <span className="text-sm font-semibold">Connect Youtube</span>
      </div>
    </Button>
  );
};
