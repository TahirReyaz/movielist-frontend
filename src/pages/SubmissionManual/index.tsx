import React from "react";
import ComingSoon from "../ComingSoon";

const SubmissionManual = () => {
  return (
    <div className="pt-12 px-8 md:px-60 h-screen">
      <h1 className="text-5xl font-medium text-center mb-16">
        There is no feature for adding media yet
      </h1>
      <h2 className="text-3xl font-medium mb-8">
        I use the API provided by TheMovieDB(tmdb) to get details about movies
        or shows. To add media on their database, I'll have to make an account
        on their website then add this feature on this website. But the new
        media submissions will be in my name, which ins't a good thing.
      </h2>

      <h2 className="text-3xl font-medium mb-8">
        So until I come up with a better solution this feature won't be released
      </h2>
      <ComingSoon />
    </div>
  );
};

export default SubmissionManual;
