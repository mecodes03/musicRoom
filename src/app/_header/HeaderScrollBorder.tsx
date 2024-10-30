"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type THeaderScrollBorderBorderContext = {
  isVisible: boolean;
  visible: (visible: boolean) => void;
};

export const HeaderScrollBorderBorderContext =
  React.createContext<THeaderScrollBorderBorderContext>({
    visible: () => null,
    isVisible: false,
  });

export const HeaderScrollBorderBorderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isBorderVisible, setIsBorderVisible] = React.useState<boolean>(false);

  const changeVisibility = React.useCallback((visible: boolean) => {
    setIsBorderVisible(visible);
  }, []);

  return (
    <HeaderScrollBorderBorderContext.Provider
      value={{
        isVisible: isBorderVisible,
        visible: changeVisibility,
      }}
    >
      {children}
    </HeaderScrollBorderBorderContext.Provider>
  );
};

interface HeaderScrollBorderProps {
  className?: ClassValue;
}

const HeaderScrollBorder = ({ className }: HeaderScrollBorderProps) => {
  const { isVisible, visible } = React.useContext(
    HeaderScrollBorderBorderContext
  );

  React.useEffect(() => {
    const handleHeaderScrollBorder = () => {
      if (window.scrollY > 20) {
        visible(true);
      } else {
        visible(false);
      }
    };
    window.addEventListener("HeaderscrollBorder", handleHeaderScrollBorder);
  }, [visible]);

  return (
    <div
      className={cn(
        `transition-[background-color]`,
        { "bg-neutral-800": isVisible },
        className
      )}
      aria-disabled
    />
  );
};

export { HeaderScrollBorder };
