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
      path: `/user/${username}/showlist`,
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
      text: "Browse",
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
      <nav className="bg-bgSecondary py-4 px-40 font-body flex justify-between items-center">
        <Link to="/">Movie List</Link>

        <div className="flex gap-6 ml-7">
          {/* Auth */}
          {isLoggedIn &&
            username &&
            authRoutes.map((item: routeItem, index: number) => (
              <NavLink
                to={item.path}
                className="self-center"
                key={index}
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "normal" : "200",
                  };
                }}
              >
                <span>{item.text}</span>
              </NavLink>
            ))}
          {/* No auth */}
          {!isLoggedIn &&
            noAuthRoutes.map((item: routeItem, index: number) => (
              <NavLink
                to={item.path}
                className="self-center"
                key={index}
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "normal" : "200",
                  };
                }}
              >
                <span>{item.text}</span>
              </NavLink>
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
            <NavLink
              to={"/login"}
              className="self-center"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "normal" : "200",
                };
              }}
            >
              <span>Login</span>
            </NavLink>
            <NavLink
              to={"/signup"}
              className="self-center"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "normal" : "200",
                };
              }}
            >
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
