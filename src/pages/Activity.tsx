import React from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getActivity } from "../lib/api";
import Loading from "../components/UI/Loading";
import ActivityComponent from "../components/Activity";
import { Helmet } from "react-helmet-async";
import { IActivity } from "../constants/Interfaces/activity";

const Activity = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const {
    data: activity,
    isLoading,
    isError,
  } = useQuery<IActivity>({
    queryKey: ["activity", id],
    queryFn: () => getActivity(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    navigate("/404");
  }

  if (activity && id) {
    return (
      <>
        <Helmet>
          <title>{`${activity.owner.username}'s Activity · MovieList`}</title>
        </Helmet>
        <main className="px-12 md:px-56 pt-12 min-h-[60vh]">
          <ActivityComponent
            {...{ ...activity, location: "page", queryKey: ["activity", id] }}
          />
        </main>
      </>
    );
  }
};

export default Activity;
