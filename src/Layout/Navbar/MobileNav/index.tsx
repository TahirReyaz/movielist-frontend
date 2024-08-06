import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTimes,
  FaBars,
  FaComments,
  FaUserFriends,
  FaSearch,
  FaUser,
  FaUserPlus,
  FaSignInAlt,
  FaHome,
  FaFilm,
  FaTv,
  FaBell,
  FaCog,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface MenuOption {
  label: string;
  icon: JSX.Element;
  path: string;
}

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isLoggedIn, username } = useSelector(
    (state: RootState) => state.auth
  );

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuOptions: MenuOption[] = isLoggedIn
    ? [
        { label: "Home", icon: <FaHome />, path: "/" },
        {
          label: "Movie List",
          icon: <FaFilm />,
          path: `/user/${username}/movielist`,
        },
        { label: "TV List", icon: <FaTv />, path: `/user/${username}/tvlist` },
        { label: "Forum", icon: <FaComments />, path: "/forum" },
        { label: "Profile", icon: <FaUser />, path: `/user/${username}` },
        { label: "Notifications", icon: <FaBell />, path: "/notifications" },
        { label: "Settings", icon: <FaCog />, path: "/settings" },
        { label: "Search", icon: <FaSearch />, path: "/search" },
      ]
    : [
        { label: "Forum", icon: <FaComments />, path: "/forum" },
        { label: "Social", icon: <FaUserFriends />, path: "/social" },
        { label: "Search", icon: <FaSearch />, path: "/search" },
        { label: "Sign Up", icon: <FaUserPlus />, path: "/signup" },
        { label: "Login", icon: <FaSignInAlt />, path: "/login" },
      ];

  return (
    <div className="block md:hidden z-40 relative">
      {/* Floating hamburger icon or close icon based on isMenuOpen */}
      {!isMenuOpen && (
        <button
          onClick={handleToggleMenu}
          className="fixed bottom-16 right-8 text-6xl text-actionPrimary bg-bgSecondary rounded-md p-2"
        >
          <FaBars />
        </button>
      )}

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="fixed bottom-12 right-8 bg-bgSecondary p-4 rounded-md shadow-md">
          <div className="grid grid-cols-3 gap-4">
            {menuOptions.map((option, index) => (
              <Link
                key={index}
                to={option.path}
                className="text-white flex flex-col items-center p-2 rounded-md text-xl"
              >
                <span className="text-4xl">{option.icon}</span>
                <span>{option.label}</span>
              </Link>
            ))}
            <button
              className="text-white text-4xl flex flex-col items-center p-2 rounded-md"
              onClick={handleToggleMenu}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
