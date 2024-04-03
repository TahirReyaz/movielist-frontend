import React from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const LoadingBar: React.FC = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  // Combine the loading progress from both isFetching and isMutating
  const loadingProgress = Math.max(isFetching, isMutating);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-actionPrimary to-actionSecondary transition-all ${
        loadingProgress ? "opacity-100" : "opacity-0"
      }`}
      style={{ width: `${loadingProgress}%` }}
    />
  );
};

export default LoadingBar;
