import React, { useState } from "react";

import LowerLayout from "../../components/UI/LowerLayout";
import ComingSoon from "../ComingSoon";
import Menu from "./Menu";
import { NotifType } from "../../constants/types";

const Notifications = () => {
  const [currentOption, setCurrentOption] = useState<NotifType>("all");

  return (
    <LowerLayout
      {...{
        left: <Menu {...{ currentOption, setCurrentOption }} />,
        right: <ComingSoon />,
      }}
    />
  );
};

export default Notifications;
