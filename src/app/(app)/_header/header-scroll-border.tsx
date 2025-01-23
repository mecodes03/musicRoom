"use client";

import { cn } from "@/lib/utils";
import useScrollBorderStore from "@/store/scroll-border-store";
import { ClassValue } from "clsx";

interface HeaderScrollBorderProps {
  className?: ClassValue;
}

export const HeaderScrollBorder = ({ className }: HeaderScrollBorderProps) => {
  const { isBorderVisible } = useScrollBorderStore();
  console.log(isBorderVisible);
  return (
    <div
      className={cn(
        `transition-[background-color]`,
        { "bg-gray-800": isBorderVisible },
        className
      )}
      aria-disabled
    />
  );
};
