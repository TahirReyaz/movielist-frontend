import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUserDetail } from "../../../lib/api";
import LowerLayout from "../../../components/UI/LowerLayout";
import MediaListGroup from "./MediaListGroup.tsx";
import { entryType, mediaTypeType } from "../../../constants/types";
import LeftSection from "./LeftSection.tsx";

type listGroupType = {
  title: string;
  entries: entryType[] | [];
};

const MediaList = () => {
  const { username } = useParams();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mediaType: mediaTypeType =
    pathname.split("/")[3].split("#")[0] === "movielist" ? "movie" : "tv";

  const { data: profile, isError } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getUserDetail(username),
    enabled: !!username,
  });

  const listGrps: listGroupType[] = [];
  if (profile?.transEntries) {
    for (const listType in profile.transEntries[mediaType]) {
      if (
        profile.transEntries[mediaType][listType].length &&
        profile.transEntries[mediaType][listType].length > 0
      ) {
        listGrps.push({
          title: `${listType} ${mediaType}`,
          entries: profile.transEntries[mediaType][listType],
        });
      }
    }
  }

  if (isError) {
    navigate("/404");
  }

  return (
    <LowerLayout
      {...{
        left: <LeftSection />,
        right: (
          <div className="flex flex-col">
            {profile && listGrps.length > 0 ? (
              <>
                <div className="self-end">Buttons</div>
                {listGrps.map((grp: any) => (
                  <MediaListGroup
                    {...{
                      entries: grp.entries,
                      key: grp.title,
                      listType: grp.title,
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
