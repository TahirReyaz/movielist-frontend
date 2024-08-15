import React from "react";

import MediaListItem from "./MediaListItem";

interface MediaListGroupParams {
  listType: string;
  entries: any[];
  mediaType: string;
}

const MediaListGroup = ({
  listType,
  entries,
  mediaType,
}: MediaListGroupParams) => {
  if (!entries || entries.length === 0) {
    return;
  }
  return (
    <div>
      <div className="p-4">
        <h3 className="text-3xl">{listType}</h3>
      </div>
      <div className="mb-4 bg-bgSecondary rounded-md overflow-hidden">
        <>
          <div className="w-full hidden md:grid grid-cols-4 md:grid-cols-12 text-2xl font-medium py-8 pe-8">
            <div className="md:col-span-1" />
            <div className="col-span-1 md:col-span-8">Title</div>
            <div className="col-span-1" />
            <div className="col-span-1">Score</div>
            <div className="col-span-1">Progress</div>
          </div>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <MediaListItem {...{ entry, key: entry.id, mediaType }} />
            ))
          ) : (
            <span className="text-2xl p-8">No items in list</span>
          )}
        </>
      </div>
    </div>
  );
};

export default MediaListGroup;
