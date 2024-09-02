import React from "react";
import MDEditor from "@uiw/react-md-editor";

interface AboutProps {
  about: string;
}

const About = ({ about }: AboutProps) => {
  return (
    <MDEditor.Markdown
      {...{
        source: about,
        className: "p-4 !bg-anilist-mirage rounded-lg mb-8",
      }}
    />
  );
};

export default About;
