import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../store";

const MenuSideBar = () => {
  const { option } = useParams();
  const username = useSelector((state: RootState) => state.profile.username);

  const options = [
    {
      group: "Movie and TV",
      list: [
        { title: "Overview", path: "/" },
        { title: "Genres", path: "genres" },
        { title: "Tags", path: "tags" },
        { title: "Actors", path: "actors" },
        { title: "Studios", path: "studios" },
        { title: "Staff", path: "staff" },
      ],
    },
  ];

  return (
    <div className="col-span-1">
      {options.map((opt, index: number) => (
        <ul className="flex flex-col" key={index}>
          <span className="text-xl">{opt.group}</span>
          {opt.list.map((item) => (
            <Link
              className={`px-4 py-1 my-2 cursor:pointer text-[1.4rem] rounded ${
                option === item.path ? "font-semibold bg-bgForeground" : ""
              }`}
              to={`/user/${username}/stats/${
                item.path === "/" ? "" : item.path
              }`}
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
