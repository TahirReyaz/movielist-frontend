import React from "react";

import thumbnailPlaceholder from "../../assets/posterPlaceholder.jpg";

import { VideoResult } from "../../constants/types/media";
import { Link } from "react-router-dom";

const VideoCard = ({
  siteKey,
  name,
  type,
}: VideoResult & { siteKey: string }) => {
  return (
    <Link
      target="_blank"
      to={`https://youtu.be/${siteKey}`}
      className="rounded-lg bg-anilist-mirage relative overflow-hidden hover:text-anilist-blue-picton"
    >
      <img
        {...{
          src: thumbnailPlaceholder,
          className: "aspect-video object-center object-cover",
        }}
      />
      <div className="bg-anilist-bunker/80 text-xl p-2 absolute top-0 left-0 rounded-br">
        {type}
      </div>
      <div className="bg-anilist-bunker/80 text-2xl text-center absolute bottom-0 py-4 w-full">
        {name}
      </div>
    </Link>
  );
};

export default VideoCard;
