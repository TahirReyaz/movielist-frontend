import React from "react";
import Stats from "./Stats";

const RightSection = () => {
  return (
    <section className="col-span-6">
      <Stats {...{ type: "movie" }} />
      <Stats {...{ type: "tv" }} />
    </section>
  );
};

export default RightSection;
