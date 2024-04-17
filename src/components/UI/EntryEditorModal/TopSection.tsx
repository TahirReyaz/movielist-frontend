import React from "react";

import posterPlaceholder from "../../../assets/posterPlaceholder.jpg";

import { tmdbImgEndPoint } from "../../../constants/tmdb";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import Button from "../Button";

interface TopSectionProps {
  title?: string;
  poster?: string;
  backdrop?: string;
  fav?: boolean;
  onSave: () => void;
  onFav: () => void;
  onUnFav: () => void;
  onClose: () => void;
}

const TopSection = ({
  title,
  poster,
  backdrop,
  fav,
  onSave,
  onFav,
  onUnFav,
  onClose,
}: TopSectionProps) => {
  const backdropStyle = {
    "--backdrop-url": `url(${tmdbImgEndPoint}${backdrop})`,
  } as React.CSSProperties;

  return (
    <div className="bg-bgSecondary">
      <div
        style={backdropStyle}
        className={`h-[40vh] flex flex-col ${
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
        <div className="grid grid-cols-6 px-20">
          <div className="col-span-5 grid grid-cols-8">
            <img
              src={poster ? `${tmdbImgEndPoint}${poster}` : posterPlaceholder}
              alt={title}
              className="rounded col-span-1 "
            />
            <div className="text-3xl text-white col-span-7 grid items-end justify-start ms-8 mb-20">
              {title}
            </div>
          </div>
          <div className="grid items-end grid-cols-2 mb-20">
            <AiFillHeart
              className={`text-3xl col-span-1 mx-8 cursor-pointer ${
                fav ? "text-favRed" : "text-white"
              }`}
              onClick={fav ? onUnFav : onFav}
            />
            <Button
              {...{ title: "Save", onClick: onSave, classes: "font-normal" }}
            />
          </div>
        </div>
      </div>
      <div className="bg-bgSecondary p-8" />
    </div>
  );
};

export default TopSection;
