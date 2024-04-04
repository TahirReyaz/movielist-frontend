import React from "react";

import { tmdbImgEndPoint } from "../../../../../constants/tmdb";
import userAvatar from "../../../../../assets/userAvatar.png";
import { Link } from "react-router-dom";

const CharacterCard = ({ char }: any) => {
  return (
    <div className="grid grid-cols-5 rounded overflow-hidden bg-bgForeground h-[80px]">
      <img
        src={char.char_img ? `${tmdbImgEndPoint}${char.char_img}` : userAvatar}
        alt={char.name}
      />
      <div className="col-span-3 grid grid-cols-2 p-4">
        <Link to="#" className="text-xl hover:text-actionPrimary">
          {char.character}
        </Link>
        <Link to="#" className="text-xl hover:text-actionPrimary">
          {char.name}
        </Link>
      </div>
      <img src={`${tmdbImgEndPoint}${char.profile_path}`} alt={char.name} />
    </div>
  );
};

export default CharacterCard;
