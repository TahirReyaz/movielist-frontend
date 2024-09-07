import React from "react";
import { Helmet } from "react-helmet-async";

const doables = [
  "Give moral support to the developer, tell him he is doing a good job",
  "Appreciate the project",
  "Become a regular user",
  "Recommend it to friends",
  "Star the repo",
];

const Donate = () => {
  return (
    <>
      <Helmet>
        <title>Donate · MovieList</title>
      </Helmet>
      <div className="pt-12 px-8 md:px-60  min-h-[60vh]">
        <h1 className="text-5xl font-medium text-center mb-16">
          Currently not accepting any donations
        </h1>
        <h2 className="text-3xl font-medium mb-8">
          Maybe I'll add patreon or paypal later
        </h2>
        <h2 className="text-3xl font-medium mb-8">What you can do for now:</h2>
        <div className="px-4">
          {doables.map((item: string) => (
            <h3 className="text-2xl">{item}</h3>
          ))}
        </div>
      </div>
    </>
  );
};

export default Donate;
