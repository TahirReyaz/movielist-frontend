import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { FaWrench } from "react-icons/fa";

import userAvatarPlaceholder from "../../assets/userAvatar.png";

import { TMod } from "../../constants/Interfaces/mods";

const Icons: any = {
  admin: <FaWrench />,
};

const ModItem = ({ username, avatar, roles }: TMod) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div>
      <Link
        to={`/user/${username}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative"
      >
        <img src={avatar ?? userAvatarPlaceholder} className="rounded-md" />
        {hover && (
          <div className="bg-shadow/60 py-4 text-center flex items-end justify-center h-full w-full absolute top-0 left-0 rounded-md">
            <h1 className="text-xl font-medium text-white">{username}</h1>
          </div>
        )}
      </Link>
      <div className="flex justify-center gap-2 text-xl mt-2">
        {roles.map((role) => (
          <Tippy
            interactive={false}
            render={(attrs) => (
              <div
                {...attrs}
                className="bg-anilist-bunker/80 rounded-lg p-4 text-anilist-aqua_haze text-xl"
              >
                {role.role}
              </div>
            )}
          >
            <div>{Icons[role.role]}</div>
          </Tippy>
        ))}
      </div>
    </div>
  );
};

export default ModItem;
