import React from "react";

import Options from "./Options";
import MenuSideBar from "./MenuSideBar";

const Settings = () => {
  return (
    <main className="px-60 pt-16 flex justify-between grid grid-cols-1 md:grid-cols-4">
      <MenuSideBar />
      <Options />
    </main>
  );
};

export default Settings;
