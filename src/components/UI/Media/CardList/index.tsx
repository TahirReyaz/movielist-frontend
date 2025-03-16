import React from "react";

import MediaCard from "../../../MediaCard";
import { TBulkMovie, TBulkTV } from "../../../../constants/Interfaces/media";

interface CardListProps {
  items: TBulkMovie[] | TBulkTV[];
  innerRef?: React.Ref<HTMLDivElement>;
  maxResults?: number;
}

const CardList = ({ items, innerRef, maxResults = 5 }: CardListProps) => {
  return (
    <div
      className={`w-full my-4 grid grid-cols-3 md:grid-cols-${maxResults} gap-4 sm:gap-16`}
    >
      {items?.map((mediaItem, index) => (
        <MediaCard
          key={index}
          mediaDetails={mediaItem}
          innerRef={items.length === index + 1 ? innerRef : undefined}
        />
      ))}
    </div>
  );
};

export default CardList;
