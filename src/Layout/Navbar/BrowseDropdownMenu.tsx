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
          <div
            key={link.title}
            className="flex mb-2 text-2xl font-bold items-center"
          >
            <Link to={link.url}>{link.icon}</Link>
            <section className="flex flex-col ms-4">
              <Link to={link.url} className="font-bold hover:text-textBright">
                {link.title}
              </Link>
              <div>
                {link.sublinks.map((subLink) => (
                  <Link
                    className="hover:text-textBright text-lg font-medium me-4"
                    to={subLink.url}
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
