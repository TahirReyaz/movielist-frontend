import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getStaffCredits } from "../../../lib/api/staff";
import Loading from "../../../components/UI/Loading";

interface CreditsProps {
  id: string;
}

const Credits = ({ id }: CreditsProps) => {
  const {
    data: credits,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["credits", id],
    queryFn: () => getStaffCredits(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return;
  }

  return <div>Credits</div>;
};

export default Credits;
