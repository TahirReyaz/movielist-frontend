import React from "react";

import PageContainer from "../../../components/UI/PageContainer";
import MenuSideBar from "./MenuSideBar";
import Pages from "./Pages";

const Stats = () => {
  return (
    <PageContainer>
      <div className="pt-12 grid grid-cols-1 md:grid-cols-5">
        <MenuSideBar />
        <Pages />
      </div>
    </PageContainer>
  );
};

export default Stats;
