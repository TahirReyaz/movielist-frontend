import React from "react";

interface GenreOverviewProps {
  data: string;
}

const GenreOverview = ({ data }: GenreOverviewProps) => {
  return <div className="bg-bgSecondary p-8 rounded text-2xl">{data}</div>;
};

export default GenreOverview;
