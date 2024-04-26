import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import MediaSection, { mediaSectionItem } from "../../components/MediaSection";
import { getBulkMedia } from "../../lib/api";
import { bulkMediaType, mediaTypeType } from "../../constants/types";
import CardList from "../../components/UI/Media/CardList";
import Loading from "../../components/UI/Loading";
import Error from "../../components/UI/Error";
import Button from "../../components/UI/Button";

type SearchMediaParams = {
  mediaType: mediaTypeType;
  bulkType: bulkMediaType;
};

const BulkMedia = () => {
  const { mediaType: mediaTypeParam, bulkType } =
    useParams<SearchMediaParams>();

  const { ref: intersectionRef, inView } = useInView();

  const mediaType = mediaTypeParam == "tv" ? "tv" : "movie";

  const tvMediaSections: mediaSectionItem[] = [
    { type: "airing_today", mediaType, title: "AIRING TODAY" },
    { type: "on_the_air", mediaType, title: "ON THE AIR" },
  ];
  const movieMediaSections: mediaSectionItem[] = [
    { type: "upcoming", mediaType, title: "UPCOMING MOVIES" },
    {
      type: "now_playing",
      mediaType,
      title: "NOW PLAYING MOVIES",
    },
  ];
  const sameMediaSections: mediaSectionItem[] = [
    {
      type: "popular",
      mediaType,
      title: `POPULAR ${mediaType == "tv" ? "SHOWS" : "MOVIES"}`,
    },
    {
      type: "top_rated",
      mediaType,
      title: `TOP RATED ${mediaType == "tv" ? "SHOWS" : "MOVIES"}`,
    },
  ];
  const mediaSections =
    mediaType == "tv" ? tvMediaSections : movieMediaSections;
  mediaSections.push(...sameMediaSections);

  const {
    data: bulkResults,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["bulk", mediaType, bulkType],
    queryFn: ({ pageParam }) => {
      if (bulkType) {
        return getBulkMedia(mediaType, bulkType, pageParam);
      }
    },
    enabled: !!bulkType,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  if (bulkType && bulkResults) {
    const content = bulkResults?.pages.flat();
    return (
      <>
        <CardList {...{ items: content, innerRef: intersectionRef }} />
        {isFetchingNextPage && <Loading title="Loading More..." />}
      </>
    );
  }

  return (
    <>
      {mediaSections.map((item) => (
        <MediaSection {...{ ...item, key: item.title }} />
      ))}
    </>
  );
};

export default BulkMedia;
