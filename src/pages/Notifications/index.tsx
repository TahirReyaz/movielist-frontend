import React, { useState } from "react";

import LowerLayout from "../../components/UI/LowerLayout";
import Menu from "./Menu";
import { NotifType } from "../../constants/types";
import List from "./List";

const Notifications = () => {
  const [currentOption, setCurrentOption] = useState<NotifType>("all");

  return (
    <LowerLayout
      {...{
        left: <Menu {...{ currentOption, setCurrentOption }} />,
        right: <List {...{ type: currentOption }} />,
      }}
    />
  );
};

export default Notifications;
