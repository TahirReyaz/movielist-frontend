import React from "react";
import Numbers from "./Numbers";
import Country from "./Country";
import Status from "./Status";
import ReleaseYear from "./ReleaseYear";
import WatchYear from "./WatchYear";

const Overview = () => {
  return (
    <div>
      <Numbers />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <Status />
        <Country />
      </div>
      <ReleaseYear />
      <WatchYear />
    </div>
  );
};

export default Overview;
