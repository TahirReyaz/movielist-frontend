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
      url: `/search`,
      icon: <MdMovie />,
      sublinks: [
        {
          title: "Top 100",
          url: `/search`,
        },
        {
          title: "Trending",
          url: `/search`,
        },
        {
          title: "Top Action",
          url: `/search`,
        },
      ],
    },
    {
      title: "TV",
      url: `/search`,
      icon: <PiTelevisionFill />,
      sublinks: [
        {
          title: "Top 100",
          url: `/search`,
        },
        {
          title: "Trending",
          url: `/search`,
        },
        {
          title: "Top Action",
          url: `/search`,
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
          <Link
            key={link.title}
            to={link.url}
            className="flex hover:text-textBright mb-2 text-2xl font-bold items-center"
          >
            {link.icon}
            <div className="ms-2 font-bold">{link.title}</div>
          </Link>
        )),
        footerContent: footer.map((link) => (
          <Link
            key={link.title}
            to={link.url}
            className="w-5/12 hover:text-textBright flex items-center text-lg"
          >
            {link.icon} <span className="ms-2 font-medium">{link.title}</span>
          </Link>
        )),
        attrs,
      }}
    />
  );
};

export default BrowseDropdownMenu;
