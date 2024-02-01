import React from "react";
import ContentGroup from "./ContentGroup";

const RightSection = () => {
  const contentGroups = [
    { title: "Movie in Progress", content: <div /> },
    { title: "TV in Progress", content: <div /> },
    { title: "Forum Activiy", content: <div /> },
    { title: "Recent Reviews", content: <div /> },
    { title: "Trending Movie and TV", content: <div /> },
    { title: "Newly added Movie", content: <div /> },
    { title: "Newly added TV", content: <div /> },
  ];

  return (
    <section className="w-4/12">
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
