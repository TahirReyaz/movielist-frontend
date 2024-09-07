import React from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>{"Privacy Policy · MovieList"}</title>
      </Helmet>
      <div className="pt-12 px-8 md:px-60  min-h-[60vh]">
        <h1 className="text-5xl font-medium text-center mb-16">No privacy</h1>
        <h2 className="text-3xl font-medium mb-8">
          Whatever data you feed here is publicly available on your profile
        </h2>
        <h2 className="text-3xl font-medium mb-8">
          The feature for private lists will be added shortly{" "}
        </h2>
      </div>
    </>
  );
};

export default PrivacyPolicy;
