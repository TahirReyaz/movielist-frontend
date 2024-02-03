import React from "react";
import { useIsFetching } from "@tanstack/react-query";

const LoadingBar: React.FC = () => {
  const isFetching = useIsFetching();

  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 bg-actionPrimary transition-width duration-300 ${
        isFetching ? "opacity-100" : "opacity-0"
      }`}
      style={{ width: `${isFetching}%` }}
    />
  );
};

export default LoadingBar;
