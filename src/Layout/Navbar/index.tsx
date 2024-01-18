import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import route, { routeItem } from "../routes";
import { RootState } from "../../store/AuthSlice";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

import "tippy.js/animations/shift-away.css";

import userAvatar from "../../assets/userAvatar.png";

import { FaAngleDown, FaSearch } from "react-icons/fa";
import SearchModal from "../../components/search/SearchModal";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const { isLoggedIn, username } = useSelector(
    (state: RootState) => state.auth
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  console.log(route.filter((item: routeItem) => !item.noauth && !item.auth));

  return (
    <>
      <nav className="bg-bgSecondary py-4 px-40 font-body flex justify-between items-center">
        <Link to="/">Movie List</Link>

        <div className="flex gap-6 ml-7">
          {/* Auth */}
          {isLoggedIn &&
            route
              .filter((item: routeItem) => item.auth)
              .map((item: routeItem, index: number) => (
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
          {/* Hardcoded auth */}
          {isLoggedIn && username && (
            <NavLink
              to={`/user/${username}`}
              className="self-center"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "normal" : "200",
                };
              }}
            >
              <span>Profile</span>
            </NavLink>
          )}
          {isLoggedIn && username && (
            <NavLink
              to={`/user/${username}/movielist`}
              className="self-center"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "normal" : "200",
                };
              }}
            >
              <span>Movie List</span>
            </NavLink>
          )}
          {/* No auth */}
          {!isLoggedIn &&
            route
              .filter((item: routeItem) => item.noauth)
              .map((item: routeItem, index: number) => (
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
          {/* Free for all */}
          {route
            .filter((item: routeItem) => !item.noauth && !item.auth)
            .map((item: routeItem, index: number) => (
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
        {isLoggedIn && (
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
      </nav>
      <SearchModal {...{ open: showModal, setOpen: setShowModal }} />
    </>
  );
};

export default Navbar;
