import React from "react";
import { Outlet } from "react-router-dom";

const Pages = () => {
  return (
    <div className="col-span-4">
      <Outlet />
    </div>
  );
};

export default Pages;
