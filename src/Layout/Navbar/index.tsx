import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/AuthSlice";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

import "tippy.js/animations/shift-away.css";

import userAvatar from "../../assets/userAvatar.png";
import Logo from "../../assets/logo.png";

import { FaAngleDown, FaSearch } from "react-icons/fa";
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
      <nav className="bg-bgSecondary py-4 px-56 font-body flex justify-between items-center hidden md:flex">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} className="size-[50px]" />
        </Link>

        {/* Links in the middle */}
        <div className="flex gap-6 ml-7">
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

        {/* Right portion */}
        {isLoggedIn && username && (
          <div className="flex items-center">
            <FaSearch
              onClick={() => setShowModal(true)}
              className="cursor-pointer text-3xl hover:text-textBright"
            />
            <Tippy
              interactive={true}
              placement="bottom"
              arrow
              // animation="shift-away"
              render={(attrs) => <UserDropdownMenu {...{ attrs }} />}
            >
              <div className="flex items-center">
                <img
                  src={userAvatar}
                  alt="Avatar"
                  className="size-20 ms-4 cursor-pointer"
                />
                <FaAngleDown className="text-2xl" />
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
      <MobileNav />
      <SearchModal {...{ open: showModal, setOpen: setShowModal }} />
    </>
  );
};

export default Navbar;
