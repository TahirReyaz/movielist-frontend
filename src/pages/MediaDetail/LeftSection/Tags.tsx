import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMediaTags } from "../../../lib/api/media";
import Loading from "../../../components/UI/Loading";
import MediaDetailCard from "../MediaDetailCard";
import Error from "../../../components/UI/Error";

interface TagsProps {
  mediaid: string;
  mediaType: string;
}

const Tags = ({ mediaid, mediaType }: TagsProps) => {
  const {
    data: data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags", mediaid],
    queryFn: () => getMediaTags(mediaType, mediaid),
    enabled: mediaid && mediaType ? true : false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div>
      <h2 className="text-[1.4rem] font-semibold mb-4">Tags</h2>
      {data?.tags?.map((tag: any) => (
        <MediaDetailCard key={tag.id}>
          <p className="text-xl">{tag.name}</p>
        </MediaDetailCard>
      ))}
    </div>
  );
};

export default Tags;
