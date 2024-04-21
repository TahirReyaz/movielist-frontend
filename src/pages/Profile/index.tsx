import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import { getUserDetail } from "../../lib/api";
import MediaList from "./MediaList";
import Overview from "./Overview";
import { entryType, listtypetype, mediaTypeType } from "../../constants/types";
import TopSection from "./TopSection";
import Social from "./Social";
import ComingSoon from "../ComingSoon";

export type ProfileParams = {
  username: string;
};

export type listItemType = {
  listtype: listtypetype;
  mediaType: mediaTypeType;
  id: string;
  _id: string;
};

export type profileType = {
  avatar: string;
  entries: entryType[] | [];
  backdrop: string;
  _id: string;
  followers: string[] | [];
  following: string[] | [];
};

const Profile = () => {
  const { username } = useParams<ProfileParams>();

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

  return (
    <main>
      {profile && (
        <>
          {/* Image and overview */}
          <TopSection {...{ id: profile._id, ...profile, username }} />
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="movielist" element={<MediaList />} />
            <Route path="tvlist" element={<MediaList />} />
            <Route path="favorites" element={<ComingSoon />} />
            <Route path="stats" element={<ComingSoon />} />
            <Route path="social" element={<Social />} />
            <Route path="reviews" element={<ComingSoon />} />
            <Route path="submissions" element={<ComingSoon />} />
          </Routes>
        </>
      )}
    </main>
  );
};

export default Profile;
