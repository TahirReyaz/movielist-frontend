import React from "react";

const DetailsCard = ({
  title,
  release_date,
}: {
  title: string;
  release_date?: string;
}) => {
  const releaseYear = release_date ? new Date(release_date).getFullYear() : "";
  return (
    <div className="flex flex-col justify-between bg-anilist-mirage rounded-e-md p-4 h-full">
      <h2 className="text-2xl">{title}</h2>
      <p className="text-xl font-light">{releaseYear}</p>
    </div>
  );
};

export default DetailsCard;
