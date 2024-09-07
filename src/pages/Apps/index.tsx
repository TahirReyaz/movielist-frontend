import React from "react";
import { Helmet } from "react-helmet-async";

const Apps = () => {
  return (
    <>
      <Helmet>
        <title>Apps · MovieList</title>
      </Helmet>
      <div className="pt-12 px-8 md:px-60 min-h-[60vh]">
        <h1 className="text-5xl font-medium text-center mb-16">Empty!!</h1>
        <h2 className="text-3xl font-medium mb-8">
          Will use this page to list my other projects
        </h2>
      </div>
    </>
  );
};

export default Apps;
