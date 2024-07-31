import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getEntryDetail } from "../../../lib/api";

interface MediaListItemProps {
  entryId: string;
}

const MediaListItemMobile = ({ entryId }: MediaListItemProps) => {
  const {
    data: entry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["entry", entryId],
    queryFn: () => getEntryDetail(entryId),
    enabled: !!entryId,
  });
  return <div>MediaListItemMobile</div>;
};

export default MediaListItemMobile;
