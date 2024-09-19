import React from "react";
import Loading from ".";

const LoadingPage = ({ title = "Loading..." }: { title?: string }) => {
  return (
    <main className="text-center min-h-[60vh]">
      <Loading {...{ title }} />
    </main>
  );
};

export default LoadingPage;
