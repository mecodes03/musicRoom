import {
  InvidiousSearchSuggestions,
  InvidiousYoutubeTrendingVideo,
  InvidiousYoutubeVideo,
} from "./invidious-types";

const INVIDIOUS_HOST_URLS = [
  "invidious.jing.rocks",
  "inv.nadeko.net",
  "yewtu.be",
  "invidious.nerdvpn.de",
];

export async function searchYoutubeVideos(query: string) {
  const url = `${INVIDIOUS_HOST_URLS[0]}/api/v1/search?q=${encodeURIComponent(
    query
  )} music video/audio`;

  const response = await fetch(url);
  const data = response.json() as unknown as InvidiousYoutubeVideo[];

  return data;
}

export async function getTrendingYoutubeSongs() {
  const url = `${INVIDIOUS_HOST_URLS[0]}/api/v1/trending?type=music`;

  const response = await fetch(url);
  const data = response.json() as unknown as InvidiousYoutubeTrendingVideo[];

  return data;
}

export async function getYoutubeSearchSuggestions(query: string) {
  const url = `${INVIDIOUS_HOST_URLS[0]}/api/v1/search/suggestions?q=${query}`;

  const response = await fetch(url);
  const data = response.json() as unknown as InvidiousSearchSuggestions;

  return data;
}
