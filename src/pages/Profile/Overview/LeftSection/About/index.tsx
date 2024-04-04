import React from "react";

interface AboutProps {
  about: string;
}

const About = ({ about }: AboutProps) => {
  return <div>{about}</div>;
};

export default About;
