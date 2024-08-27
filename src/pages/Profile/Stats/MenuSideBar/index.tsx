import React from "react";
import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../store";

const MenuSideBar = () => {
  const { mediaType } = useParams();
  const username = useSelector((state: RootState) => state.profile.username);

  const match = useMatch("/user/:username/stats/:mediaType/:option");
  const currentOption = match?.params.option;

  const list = [
    { title: "Overview", path: "overview" },
    { title: "Genres", path: "genres" },
    { title: "Tags", path: "tags" },
    { title: "Cast", path: "cast" },
    { title: "Studios", path: "studios" },
    { title: "Crew", path: "crew" },
  ];

  const options = [
    {
      group: "Movie",
      type: "movie",
      list,
    },
    {
      group: "TV",
      type: "tv",
      list,
    },
  ];

  return (
    <div className="col-span-1">
      {options.map((opt) => (
        <ul className="flex flex-col mb-4" key={opt.type}>
          <span className="text-xl font-medium mb-2">{opt.group} Stats</span>
          {opt.list.map((item) => (
            <Link
              className={`px-4 py-1 my-2 cursor:pointer text-xl rounded font-medium ${
                currentOption == item.path && mediaType == opt.type
                  ? "bg-anilist-mirage"
                  : ""
              }`}
              to={`/user/${username}/stats/${opt.type}/${
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
