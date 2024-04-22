import React from "react";
import Feed from "./Feed";
import RightSection from "./RightSection";

const HomeAuth = () => {
  return (
    <main className="px-12 md:px-60 pt-16 grid md:grid-cols-12 gap-20 justify-between">
      <Feed />
      <RightSection />
    </main>
  );
};

export default HomeAuth;
