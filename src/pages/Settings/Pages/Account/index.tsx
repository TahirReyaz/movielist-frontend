import React from "react";
import { Helmet } from "react-helmet-async";

import ComingSoon from "../../../ComingSoon";
import DeleteAccount from "./DeleteAccount";
import BlockedUsers from "./BlockedUsers";
import ChangeUsername from "./ChangeUsername";
import ChangePassword from "./ChangePassword";

const Account = () => {
  const sections = [
    { title: "User Name", element: <ChangeUsername /> },
    { title: "Email", element: <ComingSoon /> },
    {
      title: "Change Password",
      element: <ChangePassword />,
    },
    { title: "Privacy", element: <ComingSoon /> },
    {
      title: "Login Location Security",
      label:
        "We'll check your location on a successful login to ensure it's really you logging in.",
      element: <ComingSoon />,
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
        <DeleteAccount />
        <BlockedUsers />
      </div>
    </>
  );
};

export default Account;
