import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import userAvatar from "../../assets/userAvatar.png";

import Button from "../../components/UI/Button";
import { RootState } from "../../store/AuthSlice";
import { followUser } from "../../lib/api";
import { tmdbImgEndPoint } from "../../constants/tmdb";

interface TopSectionProps {
  username?: string;
  backdrop?: string;
  dp?: string;
  id: string;
}

const TopSection = ({ username, backdrop, dp, id }: TopSectionProps) => {
  const {
    userid,
    isLoggedIn,
    following,
    username: currentUsername,
  } = useSelector((state: RootState) => state.auth);

  let followingThisUser: boolean = false;
  if (following && following.length > 0) {
    followingThisUser = following.find(
      (followingId: string) => followingId === id
    )
      ? true
      : false;
  }

  const links = [
    {
      to: `/user/${username}`,
      title: "Overview",
    },
    {
      to: `/user/${username}/movielist#pagenav`,
      title: "Movie List",
    },
    { to: `/user/${username}/tvlist#pagenav`, title: "Series List" },
    { to: `/user/${username}/favorites#pagenav`, title: "Favorites" },
    { to: `/user/${username}/stats#pagenav`, title: "Stats" },
    {
      to: `/user/${username}/social#pagenav`,
      title: "Social",
    },
    { to: `/user/${username}/reviews#pagenav`, title: "Reviews" },
    { to: `/user/${username}/submissions#pagenav`, title: "Submissions" },
  ];

  return (
    <section className="relative">
      {/* Backdrop image */}
      {backdrop ? (
        <div>
          <img src={``} alt={username} />
        </div>
      ) : (
        <div className="bg-bgBanner h-full w-full absolute z-10" />
      )}
      {/* Poster and overview */}
      <div className="flex px-56 z-20 relative">
        {/* Poster and buttons */}
        <div className="w-2/12">
          <img
            src={dp ? `${tmdbImgEndPoint}${dp}` : userAvatar}
            alt={username}
          />
        </div>
        {/* title and overview */}
        <div className="w-9/12 p-4 flex items-end justify-between">
          <h1 className="text-3xl text-textBright font-extrabold">
            {username}
          </h1>
          <div>
            {isLoggedIn && currentUsername !== username && (
              <Button
                {...{
                  title: !followingThisUser ? "Follow" : "Following",
                  onClick: followingThisUser
                    ? () => {
                        console.log("Unfollow");
                      }
                    : () => {
                        followUser(userid, id);
                      },
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* Links */}
      <ul
        className="flex bg-bgSecondary z-20 justify-around px-48 items-center relative text-xl"
        id="pagenav"
      >
        {links.map((link) => (
          <Link
            to={link.to}
            key={link.title}
            className="p-4 text-textLight hover:text-actionPrimary"
          >
            {link.title}
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default TopSection;
