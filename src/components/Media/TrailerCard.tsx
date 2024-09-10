import React from "react";

import thumbnailPlaceholder from "../../assets/posterPlaceholder.jpg";

import { VideoResult } from "../../constants/types/media";
import { Link } from "react-router-dom";

const TrailerCard = ({ siteKey, name }: VideoResult & { siteKey: string }) => {
  return (
    <Link
      target="_blank"
      to={`https://youtu.be/${siteKey}`}
      className="rounded-lg bg-anilist-mirage relative overflow-hidden"
    >
      <img
        {...{
          src: thumbnailPlaceholder,
          className: "aspect-video object-center object-cover",
        }}
      />
      <div className="bg-anilist-bunker/80 text-2xl text-center absolute bottom-0 py-4 w-full">
        {name}
      </div>
    </Link>
  );
};

export default TrailerCard;
