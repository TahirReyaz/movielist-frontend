import React from "react";
import Stats from "./Stats";
import Activities from "./Activities";

const RightSection = () => {
  return (
    <section className="col-span-6">
      <Stats {...{ type: "movie" }} />
      <Stats {...{ type: "tv" }} />
      <Activities />
    </section>
  );
};

export default RightSection;
