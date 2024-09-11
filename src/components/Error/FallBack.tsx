import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
}

const FallBack = ({ title, subtitle }: Props) => {
  return (
    <div className="bg-anilist-mirage p-12 h-[60vh]">
      <h1 className="text-3xl font-medium text-center text-anilist-aqua_haze">
        {title ?? "Oops... There was an error!"}
      </h1>
      <h2 className="text-2xl text-center text-anilist-gray-gull">
        {subtitle ?? "Please return to previous page and contact the developer"}
      </h2>
    </div>
  );
};

export default FallBack;
