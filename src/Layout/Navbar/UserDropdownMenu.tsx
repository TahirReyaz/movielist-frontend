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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { RootState, logoutAction } from "../../store/AuthSlice";
import DropdownMenu from "./DropdownMenu";
import { attrsType } from "./BrowseDropdownMenu";

const UserDropdownMenu = ({ attrs }: { attrs: attrsType }) => {
  const { username } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const primaryLinks = [
    {
      title: "Profile",
      url: `/user/${username}`,
      icon: <FaUser />,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: <FaMailBulk />,
    },
    {
      title: "Settings",
      url: "/settings",
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
    {
      title: "Logout",
      action: () => {
        dispatch(logoutAction());
        navigate("/");
      },
      icon: <FaSignOutAlt />,
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
          <div
            key={link.title}
            className="w-5/12 hover:text-textBright flex items-center text-lg"
            onClick={link.action}
          >
            {link.icon} <span className="ms-2 font-medium">{link.title}</span>
          </div>
        )),
        attrs,
      }}
    />
  );
};

export default UserDropdownMenu;
