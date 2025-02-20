import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { getUserDetails } from "../../lib/api";
import { StatusType, MediaType } from "../../constants/types";
import TopSection from "./TopSection";
import Loading from "../../components/UI/Loading";
import { setProfile } from "../../store/ProfileSlice";
import MetaTags from "../../components/UI/MetaTags";

export type ProfileParams = {
  username: string;
};

export type listItemType = {
  listtype: StatusType;
  mediaType: MediaType;
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
    queryFn: () => getUserDetails(username),
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
      <MetaTags
        {...{
          title: `${username}'s profile · MovieList`,
        }}
      />
      <main>
        <TopSection />
        <Outlet />
      </main>
    </>
  );
};

export default Profile;
