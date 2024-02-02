import React, { useState } from "react";

import MediaSection, { mediaSectionItem } from "../../components/MediaSection";
import TextInput from "../../components/UI/TextInput";
import Filter from "./Filter";

export const filterHeadingClasses =
  "text-textBright text-2xl font-semibold mb-3";

const Browse = () => {
  const [query, setQuery] = useState<string>("");
  const [genres, setGenres] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [formats, setFormats] = useState<string>("");

  const mediaSections: mediaSectionItem[] = [
    { type: "upcoming", mediaType: "movie", title: "UPCOMING MOVIES" },
    {
      type: "now_playing",
      mediaType: "movie",
      title: "NOW PLAYING MOVIES",
    },
    { type: "popular", mediaType: "movie", title: "POPULAR MOVIES" },
    { type: "top_rated", mediaType: "movie", title: "TOP RATED MOVIES" },
  ];
  const filters = [
    {
      title: "Genres",
      options: [{ value: "adrak", label: "lehsun" }],
      onChange: (val: string) => setGenres(val),
      isMulti: true,
    },
    {
      title: "Year",
      options: [{ value: "adrak", label: "lehsun" }],
      onChange: (val: string) => setYear(val),
      isMulti: false,
    },
    {
      title: "Season",
      options: [
        { value: "winter", label: "Winter" },
        { value: "spring", label: "Spring" },
        { value: "summer", label: "Summer" },
        { value: "fall", label: "Fall" },
      ],
      onChange: (val: string) => setSeason(val),
      isMulti: false,
    },
    {
      title: "Format",
      options: [{ value: "adrak", label: "lehsun" }],
      onChange: (val: string) => setFormats(val),
      isMulti: true,
    },
  ];

  return (
    <main className="pt-20 px-56">
      <div className="flex justify-between">
        <div className="w-2/12">
          <div className={filterHeadingClasses}>Search</div>
          <TextInput
            {...{
              value: query,
              onChange: (e) => setQuery(e.target.value),
              label: "",
              name: "search",
              type: "text",
              classes: "bg-bgSecondary h-full py-4",
            }}
          />
        </div>
        {filters.map((filter) => (
          <Filter {...filter} key={filter.title} />
        ))}
      </div>
      {mediaSections.map((item) => (
        <MediaSection {...{ ...item, key: item.title }} />
      ))}
    </main>
  );
};

export default Browse;
