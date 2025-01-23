import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isoDurationToString(duration: string) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  if (!matches) {
    throw new Error("Invalid duration format");
  }

  const hours = matches[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

  return (
    (hours ? hours.toString().padStart(2, "0") + ":" : "") +
    (minutes ? minutes.toString().padStart(2, "0") + ":" : "00:") +
    (seconds ? seconds.toString().padStart(2, "0") : "00")
  );
}

export function formatCount(value: string) {
  const _value = Number(value);
  if (_value >= 1e9) {
    return (_value / 1e9).toFixed(1) + "B"; // Billions
  } else if (_value >= 1e6) {
    return (_value / 1e6).toFixed(1) + "M"; // Millions
  } else if (_value >= 1e3) {
    return (_value / 1e3).toFixed(1) + "K"; // Thousands
  } else {
    return _value.toString(); // Less than 1000
  }
}

export function millisecondsToString(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Pad minutes and seconds with leading zeros if necessary
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  } else {
    return `${paddedMinutes}:${paddedSeconds}`;
  }
}
