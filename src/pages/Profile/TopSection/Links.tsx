import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../../hooks/redux";

const Links = () => {
  const { username: username } = useAppSelector((state) => state.profile);

  const links = [
    {
      to: `/user/${username}`,
      title: "Overview",
    },
    {
      to: `/user/${username}/movielist`,
      title: "Movie List",
    },
    { to: `/user/${username}/tvlist`, title: "TV List" },
    { to: `/user/${username}/favorites`, title: "Favorites" },
    { to: `/user/${username}/stats/movie/overview`, title: "Stats" },
    {
      to: `/user/${username}/social`,
      title: "Social",
    },
    { to: `/user/${username}/reviews`, title: "Reviews" },
    {
      to: `/user/${username}/submissions`,
      title: "Submissions",
    },
  ];

  return (
    <ul
      className="flex bg-bgSecondary z-20 justify-around px-12 md:px-48 items-center relative text-2xl md:text-xl w-full overflow-x-auto"
      id="pagenav"
    >
      {links.map((link) => (
        <Link
          to={link.to}
          key={link.title}
          className="p-4 text-textLight hover:text-actionPrimary min-w-fit-content font-medium"
        >
          {link.title}
        </Link>
      ))}
    </ul>
  );
};

export default Links;
