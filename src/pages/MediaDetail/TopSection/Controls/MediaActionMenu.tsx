import react from "react";
import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { addEntry } from "../../../../lib/api";
import { listtypetype } from "../../../../constants/types";
import { attrsType } from "../../../../Layout/Navbar/BrowseDropdownMenu";
import { useAppSelector } from "../../../../hooks/redux";
import { updateEntry } from "../../../../lib/api/entry";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";

type listItemType = {
  title: string;
  status: listtypetype;
};
const menuItems: listItemType[] = [
  {
    title: "Set as Planning",
    status: "planning",
  },
  { title: "Set as Watching", status: "watching" },
  { title: "Set as Paused", status: "paused" },
  { title: "Set as Dropped", status: "dropped" },
  { title: "Set as Completed", status: "completed" },
];

interface MediaActionMenuProps {
  currentStatus?: string;
  attrs: attrsType;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  existingEntry?: any;
}

const MediaActionMenu = ({
  currentStatus,
  attrs,
  setShowModal,
  existingEntry,
}: MediaActionMenuProps) => {
  const { userid, username } = useAppSelector((state) => state.auth);
  const mediaDetails = useAppSelector((state) => state.media);
  const { mediaid, mediaType } = mediaDetails;

  const queryClient = useQueryClient();

  let list = menuItems;
  if (mediaDetails.status === "Post Production") {
    list = [
      {
        title: "Set as planning",
        status: "planning",
      },
    ];
  }

  const listHandler = async (listtype: listtypetype) => {
    let response;
    if (existingEntry) {
      response = await updateEntry({
        userid,
        id: existingEntry.id,
        status: listtype,
      });
    } else {
      response = await addEntry({
        mediaType,
        mediaid,
        userid,
        status: listtype,
        title:
          (mediaType == "tv" ? mediaDetails.name : mediaDetails.title) || "meh",
        poster: mediaDetails.poster_path,
        backdrop: mediaDetails.backdrop_path,
      });
    }
    if (!response?.error) {
      queryClient.invalidateQueries({
        queryKey: ["user", username],
      });

      showSuccessToast(response?.message);
    } else {
      showErrorToast(response?.message);
    }
  };

  return (
    <ul
      className="*:px-4 *:py-2 bg-white text-textLighter text-center text-2xl rounded py-2"
      {...attrs}
    >
      {list
        .filter((item) => item.status != currentStatus)
        .map((item: listItemType) => (
          <li
            key={item.title}
            className="hover:bg-actionPrimary hover:text-white cursor-pointer"
            onClick={() => listHandler(item.status)}
          >
            {item.title}
          </li>
        ))}
      <hr />
      <li
        className="hover:bg-actionPrimary hover:text-white cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Open List Editor
      </li>
    </ul>
  );
};

export default MediaActionMenu;
