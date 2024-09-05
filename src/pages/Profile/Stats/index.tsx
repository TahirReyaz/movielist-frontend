import React from "react";

import MenuSideBar from "./MenuSideBar";
import Pages from "./Pages";
import LowerLayout from "../../../components/UI/LowerLayout";

const Stats = () => {
  return (
    <LowerLayout
      {...{
        left: <MenuSideBar />,
        right: <Pages />,
      }}
    />
  );
};

export default Stats;
