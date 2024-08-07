import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import userAvatar from "../../assets/userAvatar.png";

import Button from "../../components/UI/Button";
import { RootState } from "../../store";
import { followAction } from "../../store/AuthSlice.tsx";
import { followUser } from "../../lib/api";
import { toast } from "react-toastify";

const TopSection = () => {
  const {
    isLoggedIn,
    username: loggedUsername,
    profileData,
  } = useSelector((state: RootState) => state.auth);
  const {
    username: profileUsername,
    backdrop,
    avatar,
    _id: id,
  } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const following = profileData?.following,
    userid = profileData?._id;

  console.log({ profileUsername, backdrop, avatar, id });

  const backdropStyle = {
    "--backdrop-url": `url(${backdrop})`,
  } as React.CSSProperties;

  let followingThisUser: boolean = false;
  if (following && following.length > 0) {
    followingThisUser = following.find(
      (followingId: string) => followingId === id
    )
      ? true
      : false;
  }

  const handleFollow = async (userid: string, id: string) => {
    const response = await followUser(userid, id);

    if (!response.error) {
      dispatch(followAction(response));

      toast.success(`You started following ${profileUsername}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
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
      to: `/user/${profileUsername}/movielist#pagenav`,
      title: "Movie List",
    },
    { to: `/user/${profileUsername}/tvlist#pagenav`, title: "TV List" },
    { to: `/user/${profileUsername}/favorites#pagenav`, title: "Favorites" },
    { to: `/user/${profileUsername}/stats#pagenav`, title: "Stats" },
    {
      to: `/user/${profileUsername}/social#pagenav`,
      title: "Social",
    },
    { to: `/user/${profileUsername}/reviews#pagenav`, title: "Reviews" },
    {
      to: `/user/${profileUsername}/submissions#pagenav`,
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
                      : () => {
                          handleFollow(userid, id);
                        },
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
