import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";

import { getUserDetail } from "../../lib/api";
import { StatusType, mediaTypeType } from "../../constants/types";
import TopSection from "./TopSection";
import Loading from "../../components/UI/Loading";
import { setProfile } from "../../store/ProfileSlice";

export type ProfileParams = {
  username: string;
};

export type listItemType = {
  listtype: StatusType;
  mediaType: mediaTypeType;
  id: string;
  _id: string;
};

export type profileType = {
  avatar: string;
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
      dispatch(setProfile(profile));
    }
  }, [profile, username]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>{`${username}'s profile · MovieList`}</title>
      </Helmet>
      <main>
        <TopSection />
        <Outlet />
      </main>
    </>
  );
};

export default Profile;
