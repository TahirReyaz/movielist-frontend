import React from "react";
import { Helmet } from "react-helmet-async";

import ComingSoon from "../../../ComingSoon";
import UpdateStats from "./UpdateStats";
import DeleteLists from "./DeleteLists";

const Lists = () => {
  const sections = [
    { title: "Scoring System", element: <ComingSoon /> },
    { title: "Default List Order", element: <ComingSoon /> },
    {
      title: "List Activity Creation",
      element: <ComingSoon />,
      label: "Create an entry on your activity feed when your list updates.",
    },
    {
      title: "Stats",
      element: <UpdateStats />,
      label:
        "Your stats automatically update every 48 hours but you can force an update below",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{"Account Settings · MovieList"}</title>
      </Helmet>
      <div className="bg-anilist-mirage rounded-lg p-8">
        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-[1.4rem] font-medium mb-4">{section.title}</h2>
            {section.label && (
              <div className="text-xl mb-4">{section.label}</div>
            )}
            {section.element}
          </div>
        ))}
        <DeleteLists />
      </div>
    </>
  );
};

export default Lists;
