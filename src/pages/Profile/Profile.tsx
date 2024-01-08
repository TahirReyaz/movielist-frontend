import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUserDetail } from "../../lib/api";
import MovieList from "./MovieList";
import Overview from "./Overview";
import { listtypetype, mediaTypeType } from "../../constants/types";

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

  return (
    <main>
      {profile && (
        <>
          {/* Image and overview */}
          <div className="bg-bgSecondary">
            {/* Backdrop image */}
            <div>
              <img src={``} alt={username} />
            </div>
            {/* Poster and overview */}
            <div className="flex px-28">
              {/* Poster and buttons */}
              <div className="w-2/12">
                <img
                  src={`https://image.tmdb.org/t/p/original${profile.dp}`}
                  alt={username}
                />
              </div>
              {/* title and overview */}
              <div className="w-9/12 ms-4 p-4">
                <div>{username}</div>
              </div>
            </div>
            {/* Links */}
            <ul className="flex justify-around" id="pagenav">
              <Link to={`/user/${username}`}>Overview</Link>
              <Link to={`/user/${username}/movielist#pagenav`}>Movie List</Link>
              <li>Show List</li>
              <li>Favourites</li>
              <li>Stats</li>
              <li>Social</li>
              <li>Reviews</li>
              <li>Submissions</li>
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
