import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

import "tippy.js/animations/shift-away.css";

import userAvatar from "../../assets/userAvatar.png";
import Logo from "../../assets/logo.png";

import { FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import SearchModal from "../../components/search/SearchModal";
import Button from "../../components/UI/Button";
import UserDropdownMenu from "./UserDropdownMenu";
import NavItem from "./NavItem";
import SearchLink from "./SearchLink";
import MobileNav from "./MobileNav";

type routeItem = {
  path: string;
  text: string;
};

const Navbar = () => {
  const { isLoggedIn, username, profileData, unreadNotifs } = useSelector(
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
  ];

  const noAuthRoutes: routeItem[] = [
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
      <nav className="bg-bgSecondary py-4 px-56 font-body justify-between items-center hidden md:flex">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} className="size-[50px]" alt="MovieList" />
        </Link>

        {/* Links in the middle */}
        <div className="flex gap-16 ml-7">
          {/* Auth */}
          {isLoggedIn &&
            username &&
            authRoutes.map((item: routeItem) => (
              <NavItem {...{ ...item, key: item.text }} />
            ))}
          {isLoggedIn && username && <SearchLink title="Browse" />}
          <NavItem {...{ path: "/forum", text: "Forum" }} />

          {/* No auth */}
          {!isLoggedIn && <SearchLink title="Search" />}
          {!isLoggedIn &&
            noAuthRoutes.map((item: routeItem) => (
              <NavItem {...{ ...item, key: item.text }} />
            ))}
        </div>

        {/* Search, Avatar and User dropdown */}
        {isLoggedIn && username && (
          <div className="flex items-center gap-8">
            {/* Search */}
            <FaSearch
              onClick={() => setShowModal(true)}
              className="cursor-pointer text-3xl hover:text-textBright"
            />
            {/* Drop down */}
            <Tippy
              interactive={true}
              placement="bottom"
              arrow
              // animation="shift-away"
              render={(attrs) => <UserDropdownMenu {...{ attrs }} />}
            >
              <div className="flex items-center gap-4">
                <img
                  src={profileData?.avatar ? profileData.avatar : userAvatar}
                  alt="Avatar"
                  className="size-16 cursor-pointer rounded object-cover"
                />
                {unreadNotifs > 0 ? (
                  <Link
                    to={"/notifications"}
                    className="size-8 flex items-center justify-center bg-anilist-mandy text-anilist-aqua_haze font-medium text-lg rounded-full"
                  >
                    {unreadNotifs}
                  </Link>
                ) : (
                  <FaAngleDown className="text-2xl" />
                )}
              </div>
            </Tippy>
            {/* Notification badge */}
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
      <MobileNav />
      <SearchModal {...{ open: showModal, setOpen: setShowModal }} />
    </>
  );
};

export default Navbar;
