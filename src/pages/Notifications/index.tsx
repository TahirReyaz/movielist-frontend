import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import LowerLayout from "../../components/UI/LowerLayout";
import Menu from "./Menu";
import { NotifType } from "../../constants/types";
import List from "./List";

const Notifications = () => {
  const [currentOption, setCurrentOption] = useState<NotifType>("all");

  return (
    <>
      <Helmet>
        <title>{"Notifications · MovieList"}</title>
      </Helmet>
      <LowerLayout
        {...{
          left: <Menu {...{ currentOption, setCurrentOption }} />,
          right: <List {...{ type: currentOption }} />,
        }}
      />
    </>
  );
};

export default Notifications;
