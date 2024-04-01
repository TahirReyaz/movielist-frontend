import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const MenuSideBar = () => {
  const { option } = useParams();

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
      {options.map((opt) => (
        <ul className="flex flex-col">
          <span className="text-xl">{opt.group}</span>
          {opt.list.map((item) => (
            <Link
              className={`px-4 py-1 my-2 cursor:pointer text-[1.4rem] rounded ${
                option === item.path ? "font-semibold bg-bgForeground" : ""
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
  );
};

export default MenuSideBar;
