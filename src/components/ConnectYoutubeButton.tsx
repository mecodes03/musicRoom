"use client";
import { ClassValue } from "clsx";
import { ButtonProps, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { YoutubeLogo } from "./YoutubeLogo";
import Link from "next/link";

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
    <Link
      className={cn(
        buttonVariants({ variant, size }),
        "relative flex items-center gap-2 rounded-full px-6 py-8 overflow-hidden group",
        "transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95",
        className
      )}
      href="/api/oauth/google"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-300 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

      <div className="relative z-10 flex items-center gap-3 text-white">
        <YoutubeLogo
          height={24}
          width={24}
          className="transition-transform duration-200 ease-in-out transform group-hover:rotate-12 group-hover:scale-125"
        />

        <span className="text-sm font-semibold tracking-wider">
          Connect Youtube
        </span>
      </div>
    </Link>
  );
};
