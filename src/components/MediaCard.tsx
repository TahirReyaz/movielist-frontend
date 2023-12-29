import React from "react";

export interface mediaItemType {
  id: string;
  title: string;
  poster_path: string;
}

const MediaCard = (props: mediaItemType) => {
  return (
    <div className="w-2/12">
      <img
        src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
        alt={props.title}
        className="rounded"
      />
      {props.title}
    </div>
  );
};

export default MediaCard;
