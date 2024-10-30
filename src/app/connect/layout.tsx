import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Join MusicRoom",
  description:
    "MusicRoom is a website where you can listen to your spotify and youtube songs at a same place. you can create musicRooms, join them and listen with other people.",
};

const Layout = async ({ children }: LayoutProps) => {
  return children;
};

export default Layout;
