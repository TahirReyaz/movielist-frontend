import React from "react";

interface AboutProps {
  about: string;
}

const About = ({ about }: AboutProps) => {
  return <div className="bg-bgSecondary p-8 rounded text-2xl">{about}</div>;
};

export default About;
