import React from "react";

import MediaSection, { mediaSectionItem } from "../../components/MediaSection";

const Browse = () => {
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

  return (
    <main className="pt-4 px-56">
      {mediaSections.map((item) => (
        <MediaSection {...{ ...item, key: item.title }} />
      ))}
    </main>
  );
};

export default Browse;
