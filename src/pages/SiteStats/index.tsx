import React from "react";
import { Helmet } from "react-helmet-async";

import ComingSoon from "../ComingSoon";

const SiteStats = () => {
  return (
    <>
      <Helmet>
        <title>{"Site Stats · MovieList"}</title>
      </Helmet>
      <div className="pt-12 px-8 md:px-60  min-h-[60vh]">
        <h1 className="text-5xl font-medium text-center mb-16">
          Stats show that this is an awesome app
        </h1>
        <h2 className="text-3xl font-medium mb-8">
          Kidding. I'll add this feature eventually
        </h2>
        <ComingSoon />
      </div>
    </>
  );
};

export default SiteStats;
