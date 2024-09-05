import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { RootState } from "../store";
import { logoutAction } from "../store/AuthSlice";
import WarningModal from "../components/UI/WarningModal";

const Footer = () => {
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenWarningModal(false);
    dispatch(logoutAction());
    navigate("/");
  };

  const footerLinks = [
    {
      links: [
        {
          text: "Logout",
          action: () => setOpenWarningModal(true),
        },
        { text: "Donate", url: "/donate" },
        { text: "Imdb.com", url: "www.imdb.com", ext: true },
        { text: "TheMovieDB.org", url: "www.themoviedb.org", ext: true },
      ],
    },
    {
      links: [
        { text: "Apps", url: "/apps" },
        { text: "Site Stats", url: "/site-stats" },
        { text: "Recommendations", url: "/recommendations" },
        {
          text: "API",
          url: "https://github.com/TahirReyaz/movielist-backtend",
          ext: true,
        },
      ],
    },
    {
      links: [
        { text: "Discord", url: "#" },
        { text: "Twitter", url: "#" },
        { text: "Facebook", url: "#" },
        {
          text: "Github",
          url: "https://github.com/TahirReyaz/movielist-frontend",
          ext: true,
        },
      ],
    },
    {
      links: [
        { text: "Add Data", url: "/submission-manual" },
        { text: "Moderators", url: "/moderators" },
        { text: "Contact", url: "#" },
        { text: "Terms & Privacy", url: "/terms" },
        { text: "Site Map", url: "#" },
      ],
    },
  ];

  if (!isLoggedIn) {
    footerLinks[0].links.shift();
  }

  return (
    <footer className="px-12 md:px-56 pt-12 font-medium bg-bgFooter">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Desktop view */}
        <div>
          <h2 className="text-3xl font-medium text-anilist-blue-picton my-6">
            Site theme
          </h2>
        </div>
        {footerLinks.map((column, index) => (
          <div key={index}>
            <ul>
              {column.links.map((link, linkIndex) => (
                <li
                  key={linkIndex}
                  className="text-2xl font-medium hover:text-anilist-blue-picton my-6 cursor-pointer"
                >
                  {link.action ? (
                    <div onClick={link.action}>{link.text}</div>
                  ) : (
                    <Link to={link.url} target={link.ext ? "_blank" : "_self"}>
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

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
    </footer>
  );
};

export default Footer;
