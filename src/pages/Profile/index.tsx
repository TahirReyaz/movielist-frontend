import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUserDetail } from "../../lib/api";
import MediaList from "./MediaList";
import Overview from "./Overview";
import Stats from "./Stats";
import { entryType, listtypetype, mediaTypeType } from "../../constants/types";
import TopSection from "./TopSection";
import Social from "./Social";
import ComingSoon from "../ComingSoon";
import Loading from "../../components/UI/Loading";
import { useDispatch } from "react-redux";
import { setProfile } from "../../store/ProfileSlice";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getUserDetail(username),
    enabled: !!username,
  });

  if (isError) {
    navigate("/404");
  }

  useEffect(() => {
    if (profile) {
      dispatch(setProfile(profile._doc));
    }
  }, [profile]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <TopSection {...{ id: profile._id, ...profile, username }} />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="movielist" element={<MediaList />}>
          <Route path=":allowedList" element={<MediaList />} />
        </Route>
        <Route path="tvlist" element={<MediaList />}>
          <Route path=":allowedList" element={<MediaList />} />
        </Route>
        <Route path="favorites" element={<ComingSoon />} />
        <Route path="stats" element={<Stats />} />
        <Route path="social" element={<Social />} />
        <Route path="reviews" element={<ComingSoon />} />
        <Route path="submissions" element={<ComingSoon />} />
      </Routes>
    </main>
  );
};

export default Profile;
