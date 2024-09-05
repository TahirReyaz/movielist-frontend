import React from "react";

import MediaDetailCard from "../MediaDetailCard";
import MediaDetailField from "../MediaDetailField";
import Tags from "./Tags";
import { MovieDetail, TvDetail } from "../../../constants/types/media";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { mediaTypeType } from "../../../constants/types";

type Field = {
  fieldName: keyof (MovieDetail & TvDetail);
  label: string;
  valuesKey?: string;
};

const extraTvFields: Field[] = [
  { fieldName: "first_air_date", label: "First Air Date" },
  { fieldName: "last_air_date", label: "Last Air Date" },
  { fieldName: "number_of_episodes", label: "Number of Episodes" },
  { fieldName: "number_of_seasons", label: "Number of Seasons" },
  { fieldName: "original_name", label: "Original Name" },
];

const extraMovieFields: Field[] = [
  { fieldName: "release_date", label: "Release Date" },
  { fieldName: "runtime", label: "Runtime" },
  { fieldName: "original_title", label: "Original Title" },
];

const LeftSection = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: mediaTypeType = pathname.split("/")[1] as mediaTypeType;

  let detailFields: Field[] = [
    { fieldName: "status", label: "Status" },
    { fieldName: "tagline", label: "Tagline" },
    {
      fieldName: "production_companies",
      label: "Production Companies",
      valuesKey: "name",
    },
    { fieldName: "genres", label: "Genres", valuesKey: "name" },
    { fieldName: "vote_average", label: "Mean Score" },
    { fieldName: "popularity", label: "Popularity" },
  ];

  if (mediaType === "tv") {
    detailFields.push(...extraTvFields);
  } else if (mediaType === "movie") {
    detailFields.push(...extraMovieFields);
  }

  const { data: mediaDetails } = useQuery<MovieDetail | TvDetail>({
    queryKey: ["media", mediaType, mediaid],
  });

  return (
    mediaDetails && (
      <>
        <div className="hidden md:block">
          <MediaDetailCard>
            <span className="text-sm">#75 Highest Rated All Time</span>
          </MediaDetailCard>
          <MediaDetailCard>
            <span className="text-sm">#5 Most Popular All Time</span>
          </MediaDetailCard>
        </div>
        <div className="p-2 mb-4 bg-bgSecondary rounded flex flex-row md:flex-col overflow-x-auto">
          {detailFields.map(
            ({ fieldName, label, valuesKey }, index) =>
              mediaDetails[fieldName as keyof typeof mediaDetails] && (
                <MediaDetailField
                  {...{
                    key: index,
                    fieldName,
                    label,
                    value: mediaDetails[
                      fieldName as keyof typeof mediaDetails
                    ] as string | number,
                    values:
                      mediaDetails[fieldName as keyof typeof mediaDetails],
                    valkey: valuesKey,
                  }}
                />
              )
          )}
        </div>
        <div className="hidden md:block">
          <Tags {...{ mediaid: Number(mediaid), mediaType }} />
        </div>
      </>
    )
  );
};

export default LeftSection;
