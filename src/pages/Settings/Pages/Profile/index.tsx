import React from "react";
import ComingSoon from "../../../ComingSoon";
import Avatar from "./Avatar";
import About from "./About";

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
      element: <ComingSoon />,
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
    <div className="bg-bgForeground rounded p-8">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-[1.4rem] font-semibold">{section.title}</h2>
          {section.label && <div className="text-xl">{section.label}</div>}
          {section.element}
        </div>
      ))}
    </div>
  );
};

export default Profile;
