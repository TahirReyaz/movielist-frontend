import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTimes,
  FaBars,
  FaComments,
  FaUserFriends,
  FaSearch,
  FaUserPlus,
  FaSignInAlt,
  FaHome,
  FaFilm,
  FaTv,
  FaBell,
  FaCog,
} from "react-icons/fa";

interface MenuOption {
  label: string;
  icon: JSX.Element;
  path: string;
}

interface MobileNavProps {
  isLoggedIn: boolean;
}

const MobileNav = ({ isLoggedIn }: MobileNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuOptions: MenuOption[] = isLoggedIn
    ? [
        { label: "Home", icon: <FaHome />, path: "/" },
        { label: "Anime", icon: <FaFilm />, path: "/anime" },
        { label: "Manga", icon: <FaTv />, path: "/manga" },
        { label: "Forum", icon: <FaComments />, path: "/forum" },
        { label: "Profile", icon: <FaCog />, path: "/profile" },
        { label: "Notifications", icon: <FaBell />, path: "/notifications" },
        { label: "Settings", icon: <FaCog />, path: "/settings" },
        { label: "Search", icon: <FaSearch />, path: "/search" },
        { label: "Close", icon: <FaTimes />, path: "/close" }, // 'x' button
      ]
    : [
        { label: "Forum", icon: <FaComments />, path: "/forum" },
        { label: "Social", icon: <FaUserFriends />, path: "/social" },
        { label: "Search", icon: <FaSearch />, path: "/search" },
        { label: "Sign Up", icon: <FaUserPlus />, path: "/signup" },
        { label: "Login", icon: <FaSignInAlt />, path: "/login" },
      ];

  return (
    <div className="block md:hidden">
      {/* Floating hamburger icon or close icon based on isMenuOpen */}
      {!isMenuOpen && (
        <button
          onClick={handleToggleMenu}
          className="fixed bottom-4 right-4 text-actionPrimary bg-bgSecondary rounded p-2"
        >
          <FaBars />
        </button>
      )}

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="fixed bottom-4 right-4 bg-bgPrimary p-4 rounded-md shadow-md">
          <div className="grid grid-cols-3 gap-4">
            {menuOptions.map((option, index) => (
              <Link
                key={index}
                to={option.path}
                className="text-white flex flex-col items-center p-2 hover:bg-bgSecondary hover:text-primary rounded-md"
              >
                {option.icon}
                <span>{option.label}</span>
              </Link>
            ))}
            <button
              className="text-white flex flex-col items-center p-2 hover:bg-bgSecondary hover:text-primary rounded-md"
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
