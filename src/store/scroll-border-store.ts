// useHeaderBorderStore.ts
import { create } from "zustand";

type ScrollBorderStore = {
  isBorderVisible: boolean;
  setBorderVisibility: (visible: boolean) => void;
};

const useScrollBorderStore = create<ScrollBorderStore>((set) => ({
  isBorderVisible: false,
  setBorderVisibility: (visible) => set({ isBorderVisible: visible }),
}));

export default useScrollBorderStore;
