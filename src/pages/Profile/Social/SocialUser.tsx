import React, { useState } from "react";
import { Link } from "react-router-dom";

const SocialUser = ({ img, username }: { img: string; username: string }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative overflow-hidden rounded"
    >
      <Link to={`/user/${username}`}>
        <img src={img} />
        {hover && (
          <div className="bg-shadow/60 py-4 text-center flex items-end justify-center h-full w-full absolute top-0 left-0">
            <h1 className="text-xl font-bold text-white">{username}</h1>
          </div>
        )}
      </Link>
    </div>
  );
};

export default SocialUser;
