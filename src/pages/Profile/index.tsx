import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import { getUserDetail } from "../../lib/api";
import MovieList from "./MovieList";
import Overview from "./Overview";
import { listtypetype, mediaTypeType } from "../../constants/types";
import TopSection from "./TopSection";

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
  _id: string;
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
          <TopSection {...{ id: profile._id, ...profile, username }} />
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
