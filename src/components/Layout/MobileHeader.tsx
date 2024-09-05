import React, { Dispatch, SetStateAction, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

interface Props {
  title: string;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

const MobileHeader = ({ title, setShowMenu }: Props) => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    setShowMenu(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setShowMenu(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div
      className="flex justify-between md:hidden mb-4"
      onClick={() => setShowMenu((prev) => !prev)}
    >
      <h1 className="text-3xl font-medium">{title}</h1>
      <div className="text-4xl aspect-square h-full bg-anilist-mirage hover:text-anilist-blue-picton p-2">
        <HiDotsHorizontal />
      </div>
    </div>
  );
};

export default MobileHeader;
