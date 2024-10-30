import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderScrollBorder } from "./HeaderScrollBorder";
import { HeaderActions } from "./HeaderActions";

const Header = async () => {
  return (
    <nav className="relative h-full backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 right-0">
        <HeaderScrollBorder className="h-[1px] w-full" />
      </div>
      <div className="flex h-full items-center justify-between py-2 px-2 sm:px-8">
        <div className="flex items-center gap-x-2">
          <Link href={"/"}>
            <Image
              height={64}
              width={64}
              className="aspect-auto h-fit w-16 fill-white"
              src="/music.png"
              alt="music logo"
            />
          </Link>
        </div>

        <div className="flex gap-2">
          <Suspense fallback={<h2>loading...</h2>}>
            <HeaderActions />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export { Header };
