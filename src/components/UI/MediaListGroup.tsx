import { useEffect, useState } from "react";
import { listtypetype, mediaTypeType } from "../../constants/types";
import MediaDetailCard from "./MediaDetailCard";
import { getListDetail } from "../../lib/api";
import MediaListItem from "./MediaListItem";

interface MediaListGroupParams {
  listtype: listtypetype;
  id: string;
}

type listDetailsType = {
  items: string[] | [];
  mediatype: mediaTypeType;
  type: listtypetype;
  userid: string;
};

const MediaListGroup = ({ listtype, id }: MediaListGroupParams) => {
  const [listDetails, setListDetails] = useState<listDetailsType>();

  console.log({ listDetails });

  useEffect(() => {
    let tempList = [];
    async function fetchMedia() {
      tempList = await getListDetail(id);
      if (tempList.error) {
        console.log("Error in fetching list");
      }
      setListDetails(tempList);
    }
    fetchMedia();
  }, [id]);

  return (
    <div>
      <div className="p-4">
        <h3>{listtype}</h3>
      </div>
      {listDetails && (
        <MediaDetailCard>
          <>
            <div className="w-full flex">
              <div className="w-1/12"></div>
              <div className="w-8/12">Title</div>
              <div className="w-1/12"></div>
              <div className="w-1/12">Score</div>
              <div className="w-1/12">Progress</div>
            </div>
            {listDetails.items.length > 0 ? (
              listDetails.items.map((id: string) => (
                <MediaListItem {...{ id }} />
              ))
            ) : (
              <span>No items in list</span>
            )}
          </>
        </MediaDetailCard>
      )}
    </div>
  );
};

export default MediaListGroup;
