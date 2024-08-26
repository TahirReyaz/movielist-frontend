import React from "react";
import Numbers from "./Numbers";
import Country from "./Country";

const Overview = () => {
  return (
    <div>
      <Numbers />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Country />
      </div>
    </div>
  );
};

export default Overview;
