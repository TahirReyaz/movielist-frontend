import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import route, { routeItem } from "./routes";
import { RootState } from "../store/AuthSlice";
import { Link } from "react-router-dom";

import userAvatar from "../assets/userAvatar.png";
import { FaAngleDown, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { isLoggedIn, username } = useSelector(
    (state: RootState) => state.auth
  );
  console.log({ username });
  return (
    <nav className="bg-bgSecondary py-4 px-40 font-body flex justify-between items-center">
      <Link to="/">Movie List</Link>

      <div className="flex gap-6 ml-7">
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
      </div>

      <div className="flex items-center">
        <FaSearch />
        <img src={userAvatar} alt="Avatar" className="size-10 ms-4" />
        <FaAngleDown />
      </div>
    </nav>
  );
};

export default Navbar;
