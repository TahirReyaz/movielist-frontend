import React from "react";
import ContentGroup from "./ContentGroup";
import MediaInProgress from "./MediaInProgress.tsx";
import MediaSection from "../../../components/MediaSection.tsx";

const RightSection = () => {
  const contentGroups = [
    { title: "Forum Activiy", content: <div /> },
    { title: "Recent Reviews", content: <div /> },
    {
      title: "Trending Movie and TV",
      content: (
        <MediaSection
          {...{
            type: "popular",
            mediaType: "movie",
            maxResults: 4,
          }}
        />
      ),
    },
    { title: "Newly added Movie", content: <div /> },
    { title: "Newly added TV", content: <div /> },
  ];

  return (
    <section className="md:col-span-5 order-first md:order-last">
      <MediaInProgress
        {...{ title: "Movies in Progress", mediaType: "movie" }}
      />
      <MediaInProgress {...{ title: "Shows in Progress", mediaType: "tv" }} />
      {contentGroups.map((grp) => (
        <ContentGroup
          {...{
            title: grp.title,
            key: grp.title,
          }}
        >
          {grp.content}
        </ContentGroup>
      ))}
    </section>
  );
};

export default RightSection;
