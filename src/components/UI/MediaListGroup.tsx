import React from "react";
import { entryType, listtypetype } from "../../constants/types";
import MediaDetailCard from "../../pages/MediaDetail/MediaDetailCard";
import MediaListItem from "./MediaListItem";

interface MediaListGroupParams {
  listType: string;
  entries: entryType[];
}

const MediaListGroup = ({ listType, entries }: MediaListGroupParams) => {
  return (
    <div>
      <div className="p-4">
        <h3>{listType}</h3>
      </div>
      <MediaDetailCard classes="p-0">
        <>
          <div className="w-full flex">
            <div className="w-1/12"></div>
            <div className="w-8/12">Title</div>
            <div className="w-1/12"></div>
            <div className="w-1/12">Score</div>
            <div className="w-1/12">Progress</div>
          </div>
          {entries.length > 0 ? (
            entries.map((entry) => <MediaListItem {...{ entryId: entry.id }} />)
          ) : (
            <span>No items in list</span>
          )}
        </>
      </MediaDetailCard>
    </div>
  );
};

export default MediaListGroup;
