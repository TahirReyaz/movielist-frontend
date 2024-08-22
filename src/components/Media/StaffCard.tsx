import React from "react";
import { Link } from "react-router-dom";

import { tmdbImgEndPoint } from "../../constants/tmdb";
import userAvatar from "../../assets/userAvatar.png";
import { CrewMember } from "../../constants/types/media";

const StaffCard = ({ id, department, name, profile_path }: CrewMember) => {
  return (
    <div className="grid grid-cols-7 rounded overflow-hidden bg-bgForeground">
      <Link to={`/staff/${id}`}>
        <img
          src={profile_path ? `${tmdbImgEndPoint}${profile_path}` : userAvatar}
          alt={name}
        />
      </Link>
      <div className="col-span-6 p-4 flex flex-col items-start justify-between">
        <Link
          to={`/staff/${id}`}
          className="text-xl hover:text-actionPrimary grid justify-end"
        >
          {name}
        </Link>
        <p className="text-lg font-light">{department}</p>
      </div>
    </div>
  );
};

export default StaffCard;
