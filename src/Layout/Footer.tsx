import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../store";
import { logoutAction } from "../store/AuthSlice";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const footerLinks = [
    {
      links: [
        {
          text: "Logout",
          action: () => {
            dispatch(logoutAction());
            navigate("/");
          },
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
    <footer className="w-full p-14 font-body bg-bgFooter">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Desktop view */}
        <div>
          <h2 className="text-3xl font-bold text-actionPrimary my-6">
            Site theme
          </h2>
        </div>
        {footerLinks.map((column, index) => (
          <div key={index}>
            <ul>
              {column.links.map((link, linkIndex) => (
                <li
                  key={linkIndex}
                  className="text-2xl font-semibold hover:text-actionPrimary my-6 cursor-pointer"
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
    </footer>
  );
};

export default Footer;
