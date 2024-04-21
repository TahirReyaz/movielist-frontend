import React from "react";
import About from "./About";
import Favs from "./Favs";

interface LeftSectionProps {
  about: string;
  fav?: any;
}

const LeftSection = ({ about, fav }: LeftSectionProps) => {
  return (
    <section className="col-span-4">
      {about && <About {...{ about }} />}
      {fav && <Favs {...{ fav }} />}
    </section>
  );
};

export default LeftSection;
