import React from "react";

import MediaCard from "../../../MediaCard";
import { MediaDetailType } from "../../../../pages/MediaDetail";

interface CardListProps {
  items: MediaDetailType[];
  innerRef?: React.Ref<HTMLDivElement>;
  maxResults?: number;
}

const CardList = ({ items, innerRef, maxResults = 5 }: CardListProps) => {
  return (
    <div
      className={`w-full my-4 grid grid-cols-3 md:grid-cols-${maxResults} gap-4 sm:gap-16`}
    >
      {items?.map((mediaItem: MediaDetailType, index) => {
        if (items.length === index + 1) {
          return (
            <MediaCard
              key={mediaItem.id}
              mediaDetails={mediaItem}
              innerRef={innerRef}
            />
          );
        }
        return <MediaCard key={mediaItem.id} mediaDetails={mediaItem} />;
      })}
    </div>
  );
};

export default CardList;
