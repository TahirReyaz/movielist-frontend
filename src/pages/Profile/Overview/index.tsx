import React from "react";

import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const Overview = () => {
  return (
    <div className="pt-12 px-8 md:px-60">
      <div className="md:grid grid-cols-10 gap-16">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
};

export default Overview;
