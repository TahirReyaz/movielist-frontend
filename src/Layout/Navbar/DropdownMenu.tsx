import React from "react";
import {
  FaAppStoreIos,
  FaDiscord,
  FaHeart,
  FaMailBulk,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const primaryLinks = [
    {
      title: "Profile",
      url: "/",
      icon: <FaUser />,
    },
    {
      title: "Notifications",
      url: "/",
      icon: <FaMailBulk />,
    },
    {
      title: "Settings",
      url: "/",
      icon: <FaGear />,
    },
  ];
  const footer = [
    {
      title: "Donate",
      action: () => {},
      icon: <FaHeart />,
    },
    {
      title: "Apps",
      action: () => {},
      icon: <FaAppStoreIos />,
    },
    { title: "Discord", action: () => {}, icon: <FaDiscord /> },
    { title: "Logout", action: () => {}, icon: <FaSignOutAlt /> },
  ];
  return (
    <div className="rounded text-textLight">
      <div className="bg-bgSecondary px-4 py-2">
        {primaryLinks.map((link) => (
          <Link
            key={link.title}
            to={link.url}
            className="flex hover:text-textBright mb-2"
          >
            {link.icon}
            <div className="ms-2">{link.title}</div>
          </Link>
        ))}
      </div>
      <div className="bg-bgPrimary flex flex-wrap justify-between px-4 py-2 gap-1 cursor-pointer">
        {footer.map((link) => (
          <div
            key={link.title}
            className="w-5/12 hover:text-textBright flex items-center"
          >
            {link.icon} <span className="ms-2 text-text-lg">{link.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
