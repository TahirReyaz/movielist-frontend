import React from "react";
import Tippy from "@tippyjs/react/headless";

import MediaListItem from "./MediaListItem";
import { Entry } from "../../../constants/types/entry";
import { posterSizes, tmdbImgBaseUrl } from "../../../constants/tmdb";

interface MediaListGroupParams {
  listType: string;
  entries: Entry[];
}

const MediaListGroup = ({ listType, entries }: MediaListGroupParams) => {
  if (!entries || entries.length === 0) {
    return;
  }
  return (
    <div>
      <div className="p-4">
        <h3 className="text-3xl">{listType}</h3>
      </div>
      <div className="mb-4 pb-2 bg-anilist-mirage rounded-md overflow-hidden">
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
              <Tippy
                {...{
                  key: entry._id,
                  interactive: false,
                  trigger: "mouseenter focus",
                  placement: "left",
                  render: (attrs) => (
                    <div {...attrs}>
                      <img
                        className="rounded shadow-anilist-aqua_haze/10 shadow-md"
                        src={`${tmdbImgBaseUrl}/${posterSizes.md}${entry.poster}`}
                      />
                    </div>
                  ),
                }}
              >
                <div>
                  <MediaListItem {...{ ...entry }} />
                </div>
              </Tippy>
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
