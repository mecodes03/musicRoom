import { Song } from "./song";

export type Playlist = {
  id: string;
  currentSongIndex: number;
  songs: Song[];
  playingOrder: number[];
};
