import React from "react";
import { FaStar, FaThumbsUp, FaUserAstronaut, FaUserTie } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Placement } from "tippy.js";

import DropdownMenu from "./DropdownMenu";

export type attrsType = {
  "data-placement": Placement;
  "data-reference-hidden"?: string;
  "data-escaped"?: string;
};

const BrowseDropdownMenu = ({ attrs }: { attrs: attrsType }) => {
  const primaryLinks = [
    {
      title: "Movie",
      url: `/search/movie`,
      icon: <MdMovie />,
      sublinks: [
        {
          title: "Top 100",
          url: `/search/movie/top`,
        },
        {
          title: "Trending",
          url: `/search/movie/trending`,
        },
        {
          title: "Top Action",
          url: `/search/movie/top`,
        },
      ],
    },
    {
      title: "TV",
      url: `/search/tv`,
      icon: <PiTelevisionFill />,
      sublinks: [
        {
          title: "Top 100",
          url: `/search/tv/top`,
        },
        {
          title: "Trending",
          url: `/search/tv/trending`,
        },
        {
          title: "Top Action",
          url: `/search/tv/top`,
        },
      ],
    },
  ];
  const footer = [
    {
      title: "Staff",
      url: `/search`,
      icon: <FaUserTie />,
    },
    {
      title: "Characters",
      url: `/search`,
      icon: <FaUserAstronaut />,
    },
    {
      title: "Reviews",
      url: `/search`,
      icon: <FaStar />,
    },
    {
      title: "Recommendations",
      url: `/search`,
      icon: <FaThumbsUp />,
    },
  ];

  return (
    <DropdownMenu
      {...{
        mainContent: primaryLinks.map((link) => (
          <div
            key={link.title}
            className="flex text-2xl font-bold items-center gap-4"
          >
            <Link to={link.url}>{link.icon}</Link>
            <section className="flex flex-col ms-4">
              <Link
                to={link.url}
                className="text-anilist-gray-gull font-medium hover:text-textBright"
              >
                {link.title}
              </Link>
              <div>
                {link.sublinks.map((subLink) => (
                  <Link
                    className="hover:text-textBright text-lg font-medium me-4"
                    to={subLink.url}
                    key={subLink.title}
                  >
                    {subLink.title}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )),
        footerContent: footer.map((link) => (
          <Link
            key={link.title}
            to={link.url}
            className="hover:text-textBright text-anilist-gray-gull text-lg flex gap-2 items-center"
          >
            {link.icon} <span className="font-medium">{link.title}</span>
          </Link>
        )),
        attrs,
      }}
    />
  );
};

export default BrowseDropdownMenu;
