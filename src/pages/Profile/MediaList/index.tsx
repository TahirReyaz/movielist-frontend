import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getUserDetail } from "../../../lib/api";
import { profileType } from "..";
import LowerLayout from "../../../components/UI/LowerLayout";
import MediaListGroup from "../../../components/UI/MediaListGroup";
import { entryType, mediaTypeType } from "../../../constants/types";

type listGroupType = {
  title: string;
  entries: entryType[] | [];
};

const MediaList = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<profileType>();
  const [listGroups, setListGroups] = useState<listGroupType[]>();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mediaType: mediaTypeType =
    pathname.split("/")[3] === "movielist" ? "movie" : "tv";

  useEffect(() => {
    let tempuser = [];
    async function fetchMedia() {
      tempuser = await getUserDetail(username);
      if (tempuser.error) {
        navigate("/404");
      }
      setProfile(tempuser);
    }
    fetchMedia();
  }, [username]);

  useEffect(() => {
    if (profile && profile.entries.length > 0) {
      const planning: entryType[] = [];
      const watching: entryType[] = [];
      const dropped: entryType[] = [];
      const completed: entryType[] = [];
      const paused: entryType[] = [];

      profile.entries
        .filter((entry) => entry.mediaType === mediaType)
        .forEach((entry) => {
          if (entry.status === "planning") {
            planning.push(entry);
          } else if (entry.status === "watching") {
            watching.push(entry);
          } else if (entry.status === "dropped") {
            dropped.push(entry);
          } else if (entry.status === "completed") {
            completed.push(entry);
          } else if (entry.status === "paused") {
            paused.push(entry);
          }
          setListGroups([
            { title: `Planning ${mediaType}`, entries: planning },
            { title: `Watching ${mediaType}`, entries: watching },
            { title: `Dropped ${mediaType}`, entries: dropped },
            { title: `Completed ${mediaType}`, entries: completed },
            { title: `Paused ${mediaType}`, entries: paused },
          ]);
        });
    }
  }, [profile, mediaType]);

  return (
    <LowerLayout
      {...{
        left: (
          <div>
            <div>Search box</div>
            <div>Lists</div>
            <div>Filters</div>
            <div>Year</div>
            <div>Sort</div>
            <div>Button</div>
          </div>
        ),
        right: (
          <div className="flex flex-col">
            {profile && profile.entries.length > 0 ? (
              <>
                <div className="self-end">Buttons</div>
                {listGroups &&
                  listGroups
                    .filter((grp) => grp.entries.length > 0)
                    .map((listGroup) => (
                      <MediaListGroup
                        {...{
                          entries: listGroup.entries,
                          key: listGroup.title,
                          listType: listGroup.title,
                        }}
                      />
                    ))}
              </>
            ) : (
              <h3 className="text-2xl">No entries. Add some!!</h3>
            )}
          </div>
        ),
      }}
    />
  );
};

export default MediaList;
