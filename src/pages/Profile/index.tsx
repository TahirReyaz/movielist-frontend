import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUserDetail } from "../../lib/api";
import MovieList from "./MovieList";
import Overview from "./Overview";
import { listtypetype, mediaTypeType } from "../../constants/types";

import userAvatar from "../../assets/userAvatar.png";

type ProfileParams = {
  username: string;
};

export type listItemType = {
  listtype: listtypetype;
  mediaType: mediaTypeType;
  id: string;
  _id: string;
};

export type profileType = {
  dp: string;
  lists: listItemType[] | [];
  backdrop: string;
};

const Profile = () => {
  const { username } = useParams<ProfileParams>();

  console.log({ usernameinprofile: username });

  const [profile, setProfile] = useState<profileType>();

  const navigate = useNavigate();

  useEffect(() => {
    let tempuser = [];
    async function fetchMedia() {
      tempuser = await getUserDetail(username);
      if (tempuser.error) {
        navigate("/404");
      }
      setProfile(tempuser);
    }
    fetchMedia();
  }, [username]);

  console.log({ profile });

  const links = [
    {
      to: `/user/${username}`,
      title: "Overview",
    },
    {
      to: `/user/${username}/movielist#pagenav`,
      title: "Movie List",
    },
    { to: "/", title: "Show List" },
    { to: "/", title: "Favourite" },
    { to: "/", title: "Stats" },
    { to: "/", title: "Reviews" },
    { to: "/", title: "Submissions" },
  ];

  return (
    <main>
      {profile && (
        <>
          {/* Image and overview */}
          <div className="bg-bgSecondary">
            {/* Backdrop image */}
            {profile.backdrop && (
              <div>
                <img src={``} alt={username} />
              </div>
            )}
            {/* Poster and overview */}
            <div className="flex px-40">
              {/* Poster and buttons */}
              <div className="w-2/12">
                <img
                  src={
                    profile.dp
                      ? `${import.meta.env.VITE_TMDB_IMG_ENDPOINT}${profile.dp}`
                      : userAvatar
                  }
                  alt={username}
                />
              </div>
              {/* title and overview */}
              <div className="w-9/12 p-4 flex items-end">
                <h1 className="text-3xl text-textBright font-extrabold">
                  {username}
                </h1>
              </div>
            </div>
            {/* Links */}
            <ul className="flex justify-around px-48 items-center" id="pagenav">
              {links.map((link) => (
                <Link
                  to={link.to}
                  key={link.title}
                  className="p-4 text-textLight text-base"
                >
                  {link.title}
                </Link>
              ))}
            </ul>
          </div>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="movielist" element={<MovieList />} />
          </Routes>
        </>
      )}
    </main>
  );
};

export default Profile;
