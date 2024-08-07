import React from "react";

const Loading = ({ title = "Loading..." }: { title?: string }) => {
  return <h3 className="text-3xl font-medium">{title}</h3>;
};

export default Loading;
