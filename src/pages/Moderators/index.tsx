import React from "react";
import ModSection from "./ModSection";

const modData = [
  {
    type: "admin",
    label: "Admins",
    list: [{ username: "tahir2", positions: ["admin", "leadDev"] }],
  },
];

const Moderators = () => {
  return (
    <main className="pt-12 px-8 md:px-80 md:pt-20 min-h-screen">
      {modData.map((grp: any) => (
        <ModSection {...{ key: grp.type, ...grp }} />
      ))}
    </main>
  );
};

export default Moderators;
