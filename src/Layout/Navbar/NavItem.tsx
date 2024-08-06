import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  path: string;
  text: string;
}

const NavItem = ({ path, text }: NavItemProps) => {
  return (
    <NavLink
      to={path}
      className="self-center text-2xl font-medium hover:text-textBright"
    >
      <span>{text}</span>
    </NavLink>
  );
};

export default NavItem;
