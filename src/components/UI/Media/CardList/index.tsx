import React from "react";

import MediaCard from "../../../MediaCard";
import { MediaDetailType } from "../../../../pages/MediaDetail";

interface CardListProps {
  items: MediaDetailType[];
}

const CardList = ({ items }: CardListProps) => {
  return (
    <div className="w-full my-4 grid sm:grid-cols-5 grid-cols-3 gap-4 sm:gap-16">
      {items?.map((mediaItem: MediaDetailType) => (
        <MediaCard key={mediaItem.id} mediaDetails={mediaItem} />
      ))}
    </div>
  );
};

export default CardList;
