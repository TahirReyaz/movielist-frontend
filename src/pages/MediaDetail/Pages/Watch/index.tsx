import React from "react";
import { useLocation, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getMediaVideos } from "../../../../lib/api";
import Loading from "../../../../components/UI/Loading";
import Error from "../../../../components/UI/Error";
import VideoCard from "../../../../components/Media/VideoCard";
import {
  TMediaType,
  TVideoResult,
} from "../../../../constants/Interfaces/media";

const Watch = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: TMediaType = pathname.split("/")[1] as TMediaType;

  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery<TVideoResult[]>({
    queryKey: [mediaType, mediaid, "videos"],
    queryFn: () => getMediaVideos(mediaType, mediaid!),
    enabled: mediaid && mediaType ? true : false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (videos && videos.length === 0) {
    return (
      <h2 className="text-3xl font-medium text-center">No Videos available</h2>
    );
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {videos?.map((video, index) => (
        <VideoCard
          {...{
            ...video,
            key: index.toString(),
            siteKey: video.key,
          }}
        />
      ))}
    </section>
  );
};

export default Watch;
