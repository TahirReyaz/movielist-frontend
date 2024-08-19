import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import userAvatar from "../../assets/userAvatar.png";

import Button from "../../components/UI/Button";
import { followUser } from "../../lib/api";
import { followUserType } from "../../constants/types.ts";
import { useAppSelector } from "../../hooks/redux.ts";

const TopSection = () => {
  const {
    isLoggedIn,
    username: loggedUsername,
    profileData,
  } = useAppSelector((state) => state.auth);
  const {
    username: profileUsername,
    backdrop,
    avatar,
  } = useAppSelector((state) => state.profile);

  const queryClient = useQueryClient();

  const followingThisUser = profileData?.following?.some(
    (user: followUserType) => user.username == profileUsername
  );

  const backdropStyle = {
    "--backdrop-url": `url(${backdrop})`,
  } as React.CSSProperties;

  const handleFollow = async () => {
    const response = await followUser(profileUsername);

    try {
      toast.success(`You started following ${profileUsername}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["user", loggedUsername],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", profileUsername],
      });
    } catch (error) {
      toast.error(response.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const links = [
    {
      to: `/user/${profileUsername}`,
      title: "Overview",
    },
    {
      to: `/user/${profileUsername}/movielist`,
      title: "Movie List",
    },
    { to: `/user/${profileUsername}/tvlist`, title: "TV List" },
    { to: `/user/${profileUsername}/favorites`, title: "Favorites" },
    { to: `/user/${profileUsername}/stats/movie/overview`, title: "Stats" },
    {
      to: `/user/${profileUsername}/social`,
      title: "Social",
    },
    { to: `/user/${profileUsername}/reviews`, title: "Reviews" },
    {
      to: `/user/${profileUsername}/submissions`,
      title: "Submissions",
    },
  ];

  return (
    <section className="relative">
      {/* Backdrop, poster, username */}
      <div
        style={backdropStyle}
        className={`h-[40vh] overflow-hidden flex items-end ${
          backdrop ? "bg-[image:var(--backdrop-url)]" : "bg-bgBanner"
        }`}
      >
        {/* Poster and username */}
        <div className="grid grid-cols-11 px-12 md:px-56 z-20 relative">
          {/* Poster */}
          <div className="col-span-2">
            <img
              src={avatar ? avatar : userAvatar}
              alt={profileUsername}
              className={` mb-4 rounded size-40 object-cover`}
            />
          </div>
          {/* title and overview */}
          <div className="col-span-9 p-4 flex items-end justify-between">
            <h1 className="text-3xl text-textBright font-extrabold">
              {profileUsername}
            </h1>
            <div>
              {isLoggedIn && loggedUsername !== profileUsername && (
                <Button
                  {...{
                    title: !followingThisUser ? "Follow" : "Following",
                    onClick: followingThisUser
                      ? () => {
                          console.log("Unfollow");
                        }
                      : handleFollow,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Links */}
      <ul
        className="flex bg-bgSecondary z-20 justify-around px-12 md:px-48 items-center relative text-2xl md:text-xl w-full overflow-x-auto"
        id="pagenav"
      >
        {links.map((link) => (
          <Link
            to={link.to}
            key={link.title}
            className="p-4 text-textLight hover:text-actionPrimary min-w-fit-content font-medium"
          >
            {link.title}
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default TopSection;
