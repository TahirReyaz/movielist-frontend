import React from "react";

import { tmdbImgEndPoint } from "../../../../../constants/tmdb";
import userAvatar from "../../../../../assets/userAvatar.png";
import { Link } from "react-router-dom";
import { CastMember } from "../../../../../constants/types/media";

const CharacterCard = ({ id, character, name, profile_path }: CastMember) => {
  return (
    <div className="grid grid-cols-6 rounded overflow-hidden bg-bgForeground">
      <Link to={`/staff/${id}`}>
        <img
          src={profile_path ? `${tmdbImgEndPoint}${profile_path}` : userAvatar}
          alt={name}
        />
      </Link>
      <div className="col-span-5 p-4 flex flex-col items-start justify-between">
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
