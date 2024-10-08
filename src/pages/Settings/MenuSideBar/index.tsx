import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import MobileHeader from "../../../components/Layout/MobileHeader";

const MenuSideBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { pathname } = useLocation();
  const urlItems = pathname.split("/");

  let option = urlItems[urlItems.length - 1];

  if (option === "settings") {
    option = "/";
  }

  const options = [
    {
      group: "Settings",
      list: [
        { title: "Profile", path: "/" },
        { title: "Account", path: "account" },
        { title: "Movie & Shows", path: "media" },
        { title: "Lists", path: "lists" },
        { title: "Notifications", path: "notifications" },
        { title: "Import Lists", path: "import" },
      ],
    },
    {
      group: "Apps",
      list: [
        { title: "Apps", path: "apps" },
        { title: "Developer", path: "developer" },
      ],
    },
  ];

  return (
    <div className="col-span-1">
      <MobileHeader {...{ title: "Settings", setShowMenu }} />
      {showMenu && (
        <div>
          {options.map((opt, index: number) => (
            <ul className="flex flex-col" key={index}>
              <span className="text-xl">{opt.group}</span>
              {opt.list.map((item) => (
                <Link
                  className={`px-4 py-1 my-2 cursor:pointer text-[1.4rem] rounded ${
                    option === item.path ? "font-medium bg-anilist-mirage" : ""
                  }`}
                  to={`/settings/${item.path === "/" ? "" : item.path}`}
                  key={item.title}
                >
                  {item.title}
                </Link>
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuSideBar;
