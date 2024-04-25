import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUserDetail } from "../../../lib/api";
import LowerLayout from "../../../components/UI/LowerLayout";
import MediaListGroup from "../../../components/UI/MediaListGroup";
import { entryType, mediaTypeType } from "../../../constants/types";
import LeftSection from "./LeftSection.tsx";

type listGroupType = {
  title: string;
  entries: entryType[] | [];
};

const MediaList = () => {
  const { username } = useParams();
  const [listGroups, setListGroups] = useState<listGroupType[]>();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mediaType: mediaTypeType =
    pathname.split("/")[3].split("#")[0] === "movielist" ? "movie" : "tv";

  const { data: profile, isError } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getUserDetail(username),
    enabled: !!username,
  });

  useEffect(() => {
    if (profile && profile.entries.length > 0) {
      const planning: entryType[] = [];
      const watching: entryType[] = [];
      const dropped: entryType[] = [];
      const completed: entryType[] = [];
      const paused: entryType[] = [];

      profile.entries
        .filter((entry: any) => entry.mediaType === mediaType)
        .forEach((entry: any) => {
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

  if (isError) {
    navigate("/404");
  }

  return (
    <LowerLayout
      {...{
        left: <LeftSection />,
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
