import React from "react";
import { useSelector } from "react-redux";

import About from "./About";
import Favs from "./Favs";
import GenreOverview from "./GenreOverview";
import { RootState } from "../../../../store";
import ActivityHistory from "./ActivityHistory";

const LeftSection = () => {
  const { about, fav } = useSelector((state: RootState) => state.profile);
  return (
    <section className="col-span-4">
      {about && <About {...{ about }} />}
      <ActivityHistory />
      <GenreOverview />
      {fav && <Favs {...{ fav }} />}
    </section>
  );
};

export default LeftSection;
