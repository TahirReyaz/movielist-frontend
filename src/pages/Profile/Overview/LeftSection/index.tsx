import React from "react";
import About from "./About";

interface LeftSectionProps {
  about: string;
}

const LeftSection = ({ about }: LeftSectionProps) => {
  return (
    <section className="col-span-4">
      {about && <About {...{ about }} />}
    </section>
  );
};

export default LeftSection;
