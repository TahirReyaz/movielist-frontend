import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { RootState, logoutAction } from "../store/AuthSlice";

function Footer() {
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
        { text: "Donate", url: "#" },
        { text: "Imdb.com", url: "www.imdb.com" },
        { text: "TheMovieDB.org", url: "www.themoviedb.org" },
      ],
    },
    {
      links: [
        { text: "Apps", url: "#" },
        { text: "Site Stats", url: "#" },
        { text: "Recommendations", url: "#" },
        { text: "API", url: "#" },
      ],
    },
    {
      links: [
        { text: "Discord", url: "#" },
        { text: "Twitter", url: "#" },
        { text: "Facebook", url: "#" },
        { text: "Github", url: "#" },
      ],
    },
    {
      links: [
        { text: "App Data", url: "#" },
        { text: "Moderators", url: "#" },
        { text: "Contact", url: "#" },
        { text: "Terms & Privacy", url: "#" },
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
                    <a href={link.url}>{link.text}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
