import React from "react";

import { profileSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";
import noImg from "../../../../../assets/no_img_long.jpg";
import { Link } from "react-router-dom";
import { ICastMember } from "../../../../../constants/Interfaces/media";

const CharacterCard = ({ id, character, name, profile_path }: ICastMember) => {
  return (
    <div className="grid grid-cols-7 rounded overflow-hidden bg-bgForeground">
      <Link to={`/staff/${id}`}>
        <img
          src={
            profile_path
              ? `${tmdbImgBaseUrl}/${profileSizes.sm}${profile_path}`
              : noImg
          }
          alt={name}
        />
      </Link>
      <div className="col-span-6 p-4 flex flex-col items-start justify-between">
        <p className="text-xl">{character}</p>
        <Link
          to={`/staff/${id}`}
          className="text-xl hover:text-actionPrimary grid justify-end"
        >
          {name}
        </Link>
      </div>
    </div>
  );
};

export default CharacterCard;
