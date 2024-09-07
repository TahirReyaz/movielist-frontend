import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStaffCredits } from "../../../lib/api/staff";
import Loading from "../../../components/UI/Loading";
import CreditSection from "./CreditSection";

interface CreditsProps {
  id: string;
}

const Credits = ({ id }: CreditsProps) => {
  const { data, isLoading, isError } = useQuery({
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

  return (
    <section className="px-24">
      {data.credits.length > 0 &&
        data.credits.map((year: any, index: number) => (
          <CreditSection
            {...{
              title: year.year,
              items: year.items,
              key: index,
            }}
          />
        ))}
    </section>
  );
};

export default Credits;
