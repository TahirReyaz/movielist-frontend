import React from "react";
import { posterSizes, tmdbImgBaseUrl } from "../../../constants/tmdb";

import posterPlaceholder from "../../../assets/no_img_long.jpg";
import { Link } from "react-router-dom";

interface CreditCardProps {
  id: string;
  original_title: string;
  poster_path: string;
  media_type: string;
  character?: string;
  job?: string;
}
const CreditCard = ({
  original_title,
  poster_path,
  media_type,
  character,
  id,
  job,
}: CreditCardProps) => {
  return (
    <div>
      <Link to={`/${media_type}/${id}`}>
        <img
          src={
            poster_path
              ? `${tmdbImgBaseUrl}/${posterSizes.md}${poster_path}`
              : posterPlaceholder
          }
          alt={original_title}
          className={`rounded-md`}
        />
      </Link>
      <p className="mt-4 text-[1.4rem] font-medium">{character || job}</p>
      <Link to={`/${media_type}/${id}`} className="text-xl mt-4">
        {original_title}
      </Link>
    </div>
  );
};

export default CreditCard;
