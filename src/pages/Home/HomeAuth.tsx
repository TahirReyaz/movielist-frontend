import React from "react";
import Feed from "./Feed";
import RightSection from "./RightSection";

const HomeAuth = () => {
  return (
    <main className="px-60 pt-16 flex justify-between">
      <Feed />
      <RightSection />
    </main>
  );
};

export default HomeAuth;
