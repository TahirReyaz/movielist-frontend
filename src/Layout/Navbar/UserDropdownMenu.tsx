import React, { useState } from "react";
import {
  FaAppStoreIos,
  FaDiscord,
  FaHeart,
  FaMailBulk,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutAction } from "../../store/AuthSlice";
import DropdownMenu from "./DropdownMenu";
import { attrsType } from "./BrowseDropdownMenu";
import { useAppSelector } from "../../hooks/redux";
import WarningModal from "../../components/UI/WarningModal";

const UserDropdownMenu = ({ attrs }: { attrs: attrsType }) => {
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);
  const { username } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenWarningModal(false);
    dispatch(logoutAction());
    navigate("/");
  };

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
      action: () => navigate("/donate"),
      icon: <FaHeart />,
    },
    {
      title: "Apps",
      action: () => navigate("/apps"),
      icon: <FaAppStoreIos />,
    },
    { title: "Discord", action: () => {}, icon: <FaDiscord /> },
    {
      title: "Logout",
      action: () => setOpenWarningModal(true),
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <>
      <DropdownMenu
        {...{
          mainContent: primaryLinks.map((link) => (
            <Link
              key={link.title}
              to={link.url}
              className="flex hover:text-textBright mb-2 text-2xl font-bold items-center"
            >
              {link.icon}
              <div className="ms-8 font-bold">{link.title}</div>
            </Link>
          )),
          footerContent: footer.map((link) => (
            <div
              key={link.title}
              className="w-4/12 hover:text-textBright flex items-center text-lg"
              onClick={link.action}
            >
              {link.icon} <span className="ms-2 font-medium">{link.title}</span>
            </div>
          )),
          attrs,
        }}
      />
      <WarningModal
        {...{
          open: openWarningModal,
          setOpen: setOpenWarningModal,
          action: handleLogout,
          title: "Warning",
          message: "Are you sure you want to Log out?",
          actionName: "OK",
        }}
      />
    </>
  );
};

export default UserDropdownMenu;
