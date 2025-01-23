import { Provider } from "./provider";

export type Song = {
  id: string;
  songTitle: string;
  by: string;
  images: {
    small: string;
    medium: string;
    large: string;
  };
  songDuration: string;
  songLongTitle: string;
} & (SpotifyOnlySongProps | YoutubeOnlySongProps);

type SpotifyOnlySongProps = {
  provider: Provider.SPOTIFY;
  popularity: number;
};

type YoutubeOnlySongProps = {
  provider: Provider.YOUTUBE;
  likesCount: string;
  viewsCount: string;
};
