export interface YoutubePlaylistById {
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubePlaylist[];
}

export interface YoutubePlaylist {
  id: string;
  snippet: { publishedAt: string; title: string; channelTitle: string };
  contentDetails: { itemCount: number };
  status: {
    privacyStatus: string;
  };
}

export interface YoutubePlaylistItems {
  nextPageToken: string | null;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubePlaylistSingleItem[];
}

interface YoutubePlaylistSingleItem {
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
}

export interface YoutubeVideo {
  id: string;
  snippet: {
    publishedAt: Date;
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
        height: number;
        width: number;
      };
      standard: {
        url: string;
        height: number;
        width: number;
      };
      default: {
        url: string;
        height: number;
        width: number;
      };
    };
    channelTitle: string;
    categoryId: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
  contentDetails: {
    duration: string;
  };
}
