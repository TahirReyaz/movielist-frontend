import React from "react";
import { Link } from "react-router-dom";

import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";
import placeholderImg from "../../../../../assets/no_img_long.jpg";

const Item = ({
  title,
  img,
  id,
}: {
  title: string;
  img: string;
  id: string;
}) => {
  const src = img
    ? `${tmdbImgBaseUrl}/${posterSizes.lg}${img}`
    : placeholderImg;
  return (
    <div>
      <Link to={`/staff/${id}`}>
        <img src={src} alt={title} className="rounded" />
      </Link>
      <Link to={`/staff/${id}`} className="block mt-4">
        <h3 className="text-xl font-medium">{title}</h3>
      </Link>
    </div>
  );
};

export default Item;
