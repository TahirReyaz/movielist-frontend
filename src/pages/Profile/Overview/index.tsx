import React from "react";

import PageContainer from "../../../components/UI/PageContainer";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const Overview = () => {
  return (
    <PageContainer>
      <div className="grid grid-cols-10 gap-4">
        <LeftSection />
        <RightSection />
      </div>
    </PageContainer>
  );
};

export default Overview;
