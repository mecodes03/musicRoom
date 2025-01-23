export type InvidiousYoutubeVideo = {
  type: "video"; // Constant

  title: string;
  videoId: string;

  author: string;
  authorId: string;
  authorUrl: string;
  authorVerified: boolean;

  videoThumbnails: InvidiousYoutubeThumbnail[];

  description: string;
  descriptionHtml: string;

  viewCount: number; // Integer
  viewCountText: string;
  lengthSeconds: number; // Integer

  published: number; // Unix timestamp
  publishedText: string;

  // Only available on premiered videos
  premiereTimestamp: number; // Unix timestamp

  liveNow: boolean;
  premium: boolean;
  isUpcoming: boolean;
};

export type InvidiousYoutubeThumbnail = {
  quality: string;
  url: string;
  width: number; // Integer
  height: number; // Integer
};

export type InvidiousYoutubeImage = {
  url: string;
  width: number; // Integer
  height: number; // Integer
};

export type InvidiousYoutubeTrendingVideo = {
  title: string;
  videoId: string;
  videoThumbnails: InvidiousYoutubeThumbnail[];
  lengthSeconds: number;
  viewCount: number;
  author: string;
  authorId: string;
  authorUrl: string;
  published: number;
  publishedText: string;
  description: string;
  descriptionHtml: string;
  liveNow: boolean;
  paid: boolean;
  premium: boolean;
};

export type InvidiousSearchSuggestions = {
  query: string;
  suggestions: string[];
};
