import React from "react";
import { Helmet } from "react-helmet-async";

import ComingSoon from "../ComingSoon";

const Recommendations = () => {
  return (
    <>
      <Helmet>
        <title>{"Recommendations · MovieList"}</title>
      </Helmet>
      <div className="pt-12 px-8 md:px-60  min-h-[60vh]">
        <h1 className="text-5xl font-medium text-center mb-16">
          It is recommended to touch grass in while
        </h1>
        <h2 className="text-3xl font-medium mb-8">
          To add this feature I'll have to use Machine Learning in some way.
          Until I learn to do that, use the other features of this app
        </h2>
        <ComingSoon />
      </div>
    </>
  );
};

export default Recommendations;
