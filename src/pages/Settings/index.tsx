import React from "react";

import MenuSideBar from "./MenuSideBar";
import { Outlet } from "react-router-dom";
import LowerLayout from "../../components/UI/LowerLayout";

const Settings = () => {
  return (
    <LowerLayout
      {...{
        left: <MenuSideBar />,
        right: <Outlet />,
      }}
    />
  );
};

export default Settings;
