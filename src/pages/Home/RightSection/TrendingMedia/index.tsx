import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getBulkMedia } from "../../../../lib/api";
import Loading from "../../../../components/UI/Loading";
import {
  TBulkMovie,
  TBulkTV,
  TMovie,
} from "../../../../constants/Interfaces/media";
import TrendingMediaCard from "../../../../components/Media/TrendingMediaCard";
import { Link } from "react-router-dom";

const TrendingMedia = () => {
  const {
    data: media,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular", "movie"],
    queryFn: () => getBulkMedia("movie", "popular"),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return;
  }

  return (
    <div className="hidden md:block">
      <Link to={`/search/movie/trending`}>
        <h2 className="text-[1.4rem] font-medium px-4 py-2 hover:text-actionPrimary cursor-pointer">
          Trending Movie and TV
        </h2>
      </Link>
      <div className="grid grid-cols-4 gap-8 rounded-lg bg-anilist-mirage p-4 mb-4 shadow-lg">
        {media &&
          media
            .slice(0, 4)
            .map((item) => (
              <TrendingMediaCard
                {...{
                  key: item.id,
                  ...item,
                  title:
                    item.type === "tv"
                      ? (item as TBulkTV).name
                      : (item as TBulkMovie).title,
                }}
              />
            ))}
      </div>
    </div>
  );
};

export default TrendingMedia;
