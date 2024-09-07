import React from "react";
import ModSection from "./ModSection";
import { Helmet } from "react-helmet-async";

const modData = [
  {
    type: "admin",
    label: "Admins",
    list: [{ username: "tahir2", positions: ["admin", "leadDev"] }],
  },
];

const Moderators = () => {
  return (
    <>
      <Helmet>
        <title>Moderators · MovieList</title>
      </Helmet>
      <main className="pt-12 px-8 md:px-80 md:pt-20 min-h-[60vh]">
        {modData.map((grp: any) => (
          <ModSection {...{ key: grp.type, ...grp }} />
        ))}
      </main>
    </>
  );
};

export default Moderators;
