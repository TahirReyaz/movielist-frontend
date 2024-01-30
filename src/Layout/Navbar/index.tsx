import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/AuthSlice";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

import "tippy.js/animations/shift-away.css";

import userAvatar from "../../assets/userAvatar.png";

import { FaAngleDown, FaSearch } from "react-icons/fa";
import SearchModal from "../../components/search/SearchModal";
import DropdownMenu from "./DropdownMenu";
import Button from "../../components/UI/Button";

type routeItem = {
  path: string;
  text: string;
};

interface NavItemProps {
  path: string;
  text: string;
}

const NavItem = ({ path, text }: NavItemProps) => {
  return (
    <NavLink
      to={path}
      className="self-center text-2xl font-semibold hover:text-textBright"
    >
      <span>{text}</span>
    </NavLink>
  );
};

const Navbar = () => {
  const { isLoggedIn, username } = useSelector(
    (state: RootState) => state.auth
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const authRoutes: routeItem[] = [
    {
      path: "/",
      text: "Home",
    },
    {
      path: `/user/${username}`,
      text: "Profile",
    },
    {
      path: `/user/${username}/movielist`,
      text: "Movie List",
    },
    {
      path: `/user/${username}/tvlist`,
      text: "Show List",
    },
    {
      path: "/search",
      text: "Browse",
    },
    {
      path: "/forum",
      text: "Forum",
    },
  ];

  const noAuthRoutes: routeItem[] = [
    {
      path: "/search",
      text: "Search",
    },
    {
      path: "/social",
      text: "Social",
    },
    {
      path: "/forum",
      text: "Forum",
    },
  ];

  return (
    <>
      <nav className="bg-bgSecondary py-4 px-56 font-body flex justify-between items-center">
        <Link to="/">Movie List</Link>

        <div className="flex gap-6 ml-7">
          {/* Auth */}
          {isLoggedIn &&
            username &&
            authRoutes.map((item: routeItem) => (
              <NavItem {...{ ...item, key: item.text }} />
            ))}
          {/* No auth */}
          {!isLoggedIn &&
            noAuthRoutes.map((item: routeItem) => (
              <NavItem {...{ ...item, key: item.text }} />
            ))}
        </div>

        {/* Right portion */}
        {isLoggedIn && username && (
          <div className="flex items-center">
            <FaSearch
              onClick={() => setShowModal(true)}
              className="cursor-pointer"
            />
            <Tippy
              interactive={true}
              placement="bottom"
              arrow={false}
              animation="shift-away"
              content={<DropdownMenu />}
            >
              <div className="flex items-center">
                <img
                  src={userAvatar}
                  alt="Avatar"
                  className="size-10 ms-4 cursor-pointer"
                />
                <FaAngleDown />
              </div>
            </Tippy>
          </div>
        )}
        {/* Routes for auth */}
        {!isLoggedIn && (
          <div className="flex gap-6">
            <NavItem {...{ path: "/login", text: "Login" }} />
            <NavLink to={"/signup"} className="self-center">
              <Button
                title="Sign Up"
                classes="px-4 py-1"
                divClasses="bg-actionNav"
              />
            </NavLink>
          </div>
        )}
      </nav>
      <SearchModal {...{ open: showModal, setOpen: setShowModal }} />
    </>
  );
};

export default Navbar;
