import React from "react";

import posterPlaceholder from "../../../assets/posterPlaceholder.jpg";

import {
  backdropSizes,
  posterSizes,
  tmdbImgBaseUrl,
} from "../../../constants/tmdb";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import Button from "../Button";

interface TopSectionProps {
  title?: string;
  poster?: string;
  backdrop?: string;
  fav?: boolean;
  onFav: () => void;
  onUnFav: () => void;
  onClose: () => void;
}

const TopSection = ({
  title,
  poster,
  backdrop,
  fav,
  onFav,
  onUnFav,
  onClose,
}: TopSectionProps) => {
  const backdropStyle = {
    "--backdrop-url": `url(${tmdbImgBaseUrl}/${backdropSizes.xxl}${backdrop})`,
  } as React.CSSProperties;

  return (
    <div className="bg-bgSecondary">
      <div
        style={backdropStyle}
        className={`h-[20vh] md:h-[30vh] flex flex-col ${
          backdrop ? "bg-[image:var(--backdrop-url)]" : "bg-bgBanner"
        }`}
      >
        {/* close button */}
        <div className="grid justify-end w-full p-8">
          <AiOutlineClose
            className="cursor-pointer text-2xl text-white hover:text-actionPrimary"
            onClick={onClose}
          />
        </div>
        {/* poster, title and buttons */}
        <div className="grid grid-cols-4 md:grid-cols-6 px-8 md:px-20">
          {/* Poster and title */}
          <div className="col-span-3 md:col-span-5 grid grid-cols-3 md:grid-cols-8">
            <img
              src={
                poster
                  ? `${tmdbImgBaseUrl}/${posterSizes.sm}${poster}`
                  : posterPlaceholder
              }
              alt={title}
              className="rounded col-span-1"
            />
            <div className="text-3xl text-white col-span-2 md:col-span-7 grid items-end justify-start ms-8 mb-20">
              {title}
            </div>
          </div>
          {/* Buttons */}
          <div className="grid items-end grid-cols-2 mb-20">
            <AiFillHeart
              className={`text-3xl col-span-1 mx-8 cursor-pointer ${
                fav ? "text-favRed" : "text-white"
              }`}
              onClick={fav ? onUnFav : onFav}
            />
            <Button
              {...{ title: "Save", classes: "font-normal", type: "submit" }}
            />
          </div>
        </div>
      </div>
      <div className="bg-bgSecondary p-8" />
    </div>
  );
};

export default TopSection;
