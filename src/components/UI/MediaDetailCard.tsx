import React from "react";

type Props = {
  children: JSX.Element;
};

const MediaDetailCard = ({ children }: Props) => (
  <div className="p-2 mt-2 bg-bgSecondary rounded">{children}</div>
);

export default MediaDetailCard;
