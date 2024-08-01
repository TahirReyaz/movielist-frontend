import React from "react";

import MediaDetailCard from "../MediaDetailCard";
import MediaDetailField from "../MediaDetailField";
import { formatRuntime } from "../../../lib/helpers";
import Tags from "./Tags";
import { useAppSelector } from "../../../hooks/redux";

const detailFields = [
  { fieldName: "status", label: "Status" },
  { fieldName: "number_of_episodes", label: "Number of Episodes" },
  { fieldName: "first_air_date", label: "First Air Date" },
  { fieldName: "release_date", label: "Release Date" },
  { fieldName: "runtime", label: "Runtime" },
  { fieldName: "vote_average", label: "Vote Average" },
  { fieldName: "vote_count", label: "Vote Count" },
  { fieldName: "popularity", label: "Popularity" },
  {
    fieldName: "production_companies",
    label: "Production Companies",
    valuesKey: "name",
  },
  { fieldName: "genres", label: "Genres", valuesKey: "name" },
  { fieldName: "original_name", label: "Original Name" },
  { fieldName: "original_title", label: "Original Title" },
];

const LeftSection = () => {
  const mediaDetails = useAppSelector((state) => state.media);
  const { mediaid, mediaType } = mediaDetails;
  return (
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
          ({ fieldName, label, valuesKey }) =>
            mediaDetails[fieldName] && (
              <MediaDetailField
                key={fieldName}
                fieldName={label}
                value={
                  fieldName === "runtime"
                    ? formatRuntime(mediaDetails[fieldName])
                    : valuesKey
                    ? mediaDetails[fieldName].map((item: any) => (
                        <React.Fragment>
                          {item[valuesKey]}
                          <br />
                        </React.Fragment>
                      ))
                    : mediaDetails[fieldName]
                }
              />
            )
        )}
      </div>
      <div className="hidden md:block">
        <Tags {...{ mediaid, mediaType }} />
      </div>
    </>
  );
};

export default LeftSection;
