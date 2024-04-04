import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMediaTags } from "../../../lib/api/media";
import Loading from "../../../components/UI/Loading";
import MediaDetailCard from "../MediaDetailCard";
import Error from "../../../components/UI/Error";

interface TagsProps {
  mediaid: string | undefined;
  mediaType: string;
}

const Tags = ({ mediaid, mediaType }: TagsProps) => {
  const tagsQuery = useQuery({
    queryKey: ["tags", mediaid],
    queryFn: () => getMediaTags(mediaType, mediaid),
    enabled: mediaid && mediaType ? true : false,
  });

  if (tagsQuery.isLoading) {
    return <Loading />;
  }

  if (tagsQuery.isError) {
    return <Error />;
  }

  return (
    <div>
      <h2 className="text-[1.4rem] font-semibold mb-4">Tags</h2>
      {tagsQuery.data.tags.map((tag: any) => (
        <MediaDetailCard key={tag.id}>{tag.name}</MediaDetailCard>
      ))}
    </div>
  );
};

export default Tags;
