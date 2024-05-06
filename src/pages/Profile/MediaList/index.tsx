import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import LowerLayout from "../../../components/UI/LowerLayout";
import MediaListGroup from "./MediaListGroup.tsx";
import { mediaTypeType } from "../../../constants/types";
import LeftSection from "./LeftSection.tsx";
import { getUserLists } from "../../../lib/api/user.ts";
import { updateList } from "../../../lib/helpers.ts";

const MediaList = () => {
  const { username } = useParams();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");

  const mediaType: mediaTypeType =
    pathArray[3].split("#")[0] === "movielist" ? "movie" : "tv";
  const allowedList = pathArray[4] ? pathArray[4] : "all";

  const { data: lists, isError } = useQuery({
    queryKey: ["lists", username, mediaType],
    queryFn: () => getUserLists(username, mediaType),
    enabled: !!username,
  });

  const listMutation = useMutation({
    mutationFn: (lists: any) => {
      return updateList(lists, allowedList);
    },
  });

  useEffect(() => {
    listMutation.mutate(lists);
  }, [allowedList, lists]);

  if (isError) {
    navigate("/404");
  }

  return (
    <LowerLayout
      {...{
        left: <LeftSection {...{ allowedList }} />,
        right: (
          <div className="flex flex-col">
            {lists?.lists && lists?.lists?.length > 0 ? (
              <>
                <div className="self-end">Buttons</div>
                {lists.lists.map((grp: any) => (
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
