import React from "react";

import ComingSoon from "../../../ComingSoon";
import Avatar from "./Avatar";
import About from "./About";
import Banner from "./Banner";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const sections = [
    { title: "Profile Color", element: <ComingSoon /> },
    { title: "Site Theme", element: <ComingSoon /> },
    { title: "About", element: <About /> },
    {
      title: "Avatar",
      label:
        "Allowed Formats: JPEG, PNG. Max size: 3mb. Optimal dimensions: 230x230",
      element: <Avatar />,
    },
    {
      title: "Banner",
      label:
        "Allowed Formats: JPEG, PNG. Max size: 6mb. Optimal dimensions: 1700x330",
      element: <Banner />,
    },
    {
      title: "Timezone",
      label: "Data using your timezone may take up to 24 hours to update.",
      element: <ComingSoon />,
    },
    { title: "Restrict messages to following", element: <ComingSoon /> },
    {
      title: "Data Cache (Recommended)",
      label:
        "Data Cache improves load times by caching all data to your browser's local storage.",
      element: <ComingSoon />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{"User Profile Settings · MovieList"}</title>
      </Helmet>
      <div className="bg-anilist-mirage rounded-lg p-8">
        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-[1.4rem] font-semibold mb-4">
              {section.title}
            </h2>
            {section.label && (
              <div className="text-xl mb-4">{section.label}</div>
            )}
            {section.element}
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
