import React from "react";
import { Link } from "react-router-dom";

import noImg from "../../assets/no_img_long.jpg";

import { profileSizes, tmdbImgBaseUrl } from "../../constants/tmdb";
import { ICrewMember } from "../../constants/Interfaces/media";

const StaffCard = ({ id, department, name, profile_path }: ICrewMember) => {
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
