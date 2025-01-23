// HeaderScrollBorder.tsx
"use client";

import { useEffect } from "react";
import useScrollBorderStore from "@/store/scroll-border-store";

const ScrollBorder = () => {
  const { setBorderVisibility } = useScrollBorderStore();

  useEffect(() => {
    const handleHeaderScrollBorder = () => {
      if (window.scrollY > 20) {
        setBorderVisibility(true);
      } else {
        setBorderVisibility(false);
      }
    };

    window.addEventListener("scroll", handleHeaderScrollBorder);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleHeaderScrollBorder);
    };
  }, [setBorderVisibility]);

  return null;
};

export default ScrollBorder;
