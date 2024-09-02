import React from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { Activity as ActivityType } from "../constants/types/activity";
import { getActivity } from "../lib/api/activity";
import Loading from "../components/UI/Loading";
import ActivityComponent from "../components/Activity";

const Activity = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const {
    data: activity,
    isLoading,
    isError,
  } = useQuery<ActivityType>({
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

  return (
    <main className="px-12 md:px-56 pt-12 min-h-[50vh]">
      {activity && id && (
        <ActivityComponent
          {...{ ...activity, location: "page", queryKey: ["activity", id] }}
        />
      )}
    </main>
  );
};

export default Activity;
