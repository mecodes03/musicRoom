import { ReactNode } from "react";
import { Header } from "../_header/Header";
import Footer from "@/components/Footer";

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
    <div>
      <div className="relative min-h-screen pt-20 pb-20">
        <div className="fixed h-20 top-0 w-full z-10">
          <Header />
        </div>

        <div className="overflow-y-auto">
          {children}
          <div className="">
            <Footer />
          </div>
        </div>

        <div className="fixed bottom-0 w-full h-20 bg-gray-400 z-20"></div>
      </div>
    </div>
  );
};

export default Layout;
