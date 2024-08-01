import react from "react";
import { toast } from "react-toastify";

import { addEntry } from "../../../../lib/api";
import { listtypetype } from "../../../../constants/types";
import { attrsType } from "../../../../Layout/Navbar/BrowseDropdownMenu";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../../../hooks/redux";

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
}

const MediaActionMenu = ({
  currentStatus,
  attrs,
  setShowModal,
}: MediaActionMenuProps) => {
  const userid = useAppSelector((state) => state.auth.profileData._id);
  const mediaDetails = useAppSelector((state) => state.media);
  const { mediaid, mediaType } = mediaDetails;

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
    const response = await addEntry({
      mediaType,
      mediaid,
      userid,
      status: listtype,
      title:
        (mediaType == "tv" ? mediaDetails.name : mediaDetails.title) || "meh",
      poster: mediaDetails.poster_path,
      backdrop: mediaDetails.backdrop_path,
    });
    if (!response.error) {
      toast.success(response.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error(response.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
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
