import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "../../../../store/AuthSlice";
import { addEntry } from "../../../../lib/api";
import { listtypetype } from "../../../../constants/types";
import { MediaDetailType } from "../..";
import { attrsType } from "../../../../Layout/Navbar/BrowseDropdownMenu";

type listItemType = {
  title: string;
  status: listtypetype;
};
const menuItems: listItemType[] = [
  {
    title: "Set as planning",
    status: "planning",
  },
  { title: "Set as watching", status: "watching" },
  { title: "Set as paused", status: "paused" },
  { title: "Set as dropped", status: "dropped" },
  { title: "Set as completed", status: "completed" },
];

interface MediaActionMenuProps {
  mediaid?: string;
  mediaDetails: MediaDetailType;
  currentStatus?: string;
  attrs: attrsType;
}

const MediaActionMenu = ({
  mediaid,
  mediaDetails,
  currentStatus,
  attrs,
}: MediaActionMenuProps) => {
  const userid = useSelector((state: RootState) => state.auth.userid);

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
    const mediaType = mediaDetails.first_air_date ? "tv" : "movie";
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
      className="*:px-4 *:py-2 bg-white text-textLight text-2xl rounded py-2"
      {...attrs}
    >
      {list
        .filter((item) => item.status != currentStatus)
        .map((item: listItemType) => (
          <li
            key={item.title}
            className="hover:bg-actionPrimary cursor-pointer"
            onClick={listHandler.bind(this, item.status)}
          >
            {item.title}
          </li>
        ))}
      <hr />
      <li className="hover:bg-actionPrimary">Open List Editor</li>
    </ul>
  );
};

export default MediaActionMenu;
