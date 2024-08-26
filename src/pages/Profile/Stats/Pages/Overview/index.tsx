import React from "react";
import Numbers from "./Numbers";
import Country from "./Country";
import Status from "./Status";

const Overview = () => {
  return (
    <div>
      <Numbers />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <Status />
        <Country />
      </div>
    </div>
  );
};

export default Overview;
