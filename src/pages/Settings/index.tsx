import React from "react";

import Options from "./Options";
import MenuSideBar from "./MenuSideBar";
import PageContainer from "../../components/UI/PageContainer";

const Settings = () => {
  return (
    <PageContainer>
      <div className="pt-12 grid grid-cols-1 md:grid-cols-4">
        <MenuSideBar />
        <Options />
      </div>
    </PageContainer>
  );
};

export default Settings;
