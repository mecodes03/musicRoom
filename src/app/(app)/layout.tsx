import { ReactNode } from "react";
import { Header } from "./_header/Header";
import { ChevronRightIcon } from "lucide-react";
import ScrollBorder from "./scroll-border";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "MusicRoom | Listen music with friends",
  description:
    "MusicRoom is a website where you can listen to your spotify and youtube songs at a same place. you can create musicRooms and join them and listen with other people.",
};

const Layout = async ({ children }: LayoutProps) => {
  return (
    <>
      <div className="relative min-h-screen">
        <header className="sticky h-20 top-0 w-full z-10">
          <Header />
        </header>

        <main className="overflow-y-auto max-w-screen-xl mx-auto flex-1 min-h-[calc(100vh-160px)]">
          {children}
        </main>

        <main className="sticky bottom-0 w-full h-20 bg-gray-400 z-20"></main>
      </div>

      {/* this belew component is gonna change border visibility based on the scroll position */}
      <ScrollBorder />
    </>
  );
};

export default Layout;
