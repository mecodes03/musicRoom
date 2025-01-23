"use client";

import { Song } from "@/types/song";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

enum PlaybackType {
  SHUFFLE = "shuffle",
  SEQUENCE = "sequence",
}

enum LoopType {
  NONE = "none", // No looping
  LOOP_ALL = "loop_all", // Loop the entire playlist
  LOOP_SINGLE = "loop_single", // Loop the current song
}

type PlayerStore = {
  playingPlaylist: { id: string; songs: Song[] } | null;
  setPlayingPlaylist: (id: string, items: Song[]) => void;
  currentPagePlaylist: { id: string; items: Song[] } | null;
  setCurrentPagePlaylist: (id: string, items: Song[]) => void;
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
  queue: Song[];
  setQueue: (items: Song[]) => void;
  remove: (song: Song) => void;
  enque: (song: Song) => void;
  deque: () => Song | undefined;
  playNext: () => boolean;
  playPrevious: () => void;
  playBackType: PlaybackType;
  setPlayBackType: (PlaybackType: PlaybackType) => void;
  loopType: LoopType; // New loop type state
  setLoopType: (loopType: LoopType) => void; // New method to set loop type
};

export const usePlayerStore = create<PlayerStore>()(
  persist<PlayerStore>(
    (set, get) => ({
      playingPlaylist: null,
      setPlayingPlaylist: (id: string, songs: Song[]) =>
        set(() => ({ playingPlaylist: { id, songs } })),
      currentPagePlaylist: null,
      setCurrentPagePlaylist(id, items) {
        set({ currentPagePlaylist: { id, items } });
      },
      currentSong: null,
      setCurrentSong: (song) => set(() => ({ currentSong: song })),
      queue: [],
      setQueue: (items) => set(() => ({ queue: items })),
      remove: (song) =>
        set(({ queue }) => ({
          queue: queue.filter((_song) => _song.id !== song.id),
        })),
      enque: (song) => set(({ queue }) => ({ queue: [...queue, song] })),
      deque: () => {
        const tempQueue = get().queue;
        const item = tempQueue.shift();
        set(() => ({ queue: tempQueue }));
        return item;
      },
      playPrevious: () => {
        const currentSong = get().currentSong;
        const queue = get().queue;
        if (!currentSong || queue.length < 2) return false;
        const previousSongIndex =
          queue.findIndex((song) => song.id === currentSong.id) - 1;
        if (previousSongIndex < 0) return false;
        set({ currentSong: queue[previousSongIndex] });
        return true;
      },
      playNext: () => {
        const { currentSong, queue, loopType } = get();
        if (!currentSong || queue.length === 0) return false;

        const currentIndex = queue.findIndex(
          (song) => song.id === currentSong.id
        );
        const nextIndex = currentIndex + 1;

        if (nextIndex >= queue.length) {
          if (loopType === LoopType.LOOP_ALL) {
            set({ currentSong: queue[0] });
            return true;
          }
          return false;
        }

        set({ currentSong: queue[nextIndex] });
        return true;
      },
      playBackType: PlaybackType.SEQUENCE,
      setPlayBackType: (playBackType: PlaybackType) => set({ playBackType }),
      loopType: LoopType.NONE,
      setLoopType: (loopType: LoopType) => set({ loopType }),
    }),

    {
      name: "player-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage<PlayerStore>(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
