import React from "react";

import MediaDetailField from "../MediaDetailField";
import Tags from "./Tags";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { TMediaType, TMovie, TTV } from "../../../constants/Interfaces/media";

type Field = {
  fieldName: keyof (TMovie & TTV);
  label: string;
  valuesKey?: string;
};

const extraTvFields: Field[] = [
  { fieldName: "first_air_date", label: "First Air Date" },
  { fieldName: "air_date", label: "Release Date" },
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

const endDetailFields: Field[] = [
  { fieldName: "vote_average", label: "Mean Score" },
  { fieldName: "popularity", label: "Popularity" },
  {
    fieldName: "production_companies",
    label: "Production Companies",
    valuesKey: "name",
  },
  { fieldName: "genres", label: "Genres", valuesKey: "name" },
];

const LeftSection = () => {
  const { pathname } = useLocation();

  const { mediaid: mediaidParam } = useParams<{ mediaid: string }>();
  let mediaid: string | undefined,
    seasonNumber: undefined | number,
    isSeason = false;
  if (mediaidParam) {
    const idArray = mediaidParam.split("-");
    mediaid = idArray[0];
    seasonNumber = parseInt(idArray[1]);
    isSeason = !isNaN(seasonNumber);
  }
  const mediaType: TMediaType = pathname.split("/")[1] as TMediaType;

  let detailFields: Field[] = [
    { fieldName: "status", label: "Status" },
    { fieldName: "tagline", label: "Tagline" },
  ];

  if (mediaType === "tv") {
    detailFields.push(...extraTvFields);
  } else if (mediaType === "movie") {
    detailFields.push(...extraMovieFields);
  }

  detailFields.push(...endDetailFields);

  const { data: mediaDetails } = useQuery<TMovie | TTV>({
    queryKey: ["media", mediaType, mediaid, seasonNumber],
    enabled: !!mediaid,
  });

  return (
    mediaDetails && (
      <>
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
          {mediaid && <Tags {...{ mediaid: mediaid, mediaType }} />}
        </div>
      </>
    )
  );
};

export default LeftSection;
