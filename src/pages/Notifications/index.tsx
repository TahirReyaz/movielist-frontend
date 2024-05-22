import React from "react";
import LowerLayout from "../../components/UI/LowerLayout";
import ComingSoon from "../ComingSoon";

const Notifications = () => {
  return (
    <LowerLayout
      {...{
        left: <div>Filter</div>,
        right: <ComingSoon />,
      }}
    />
  );
};

export default Notifications;
