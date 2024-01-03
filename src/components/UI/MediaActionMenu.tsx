import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "../../store/AuthSlice";
import { addItemToList } from "../../lib/api";
import { mediaTypeType } from "../MediaSection";

type listItemType = {
  title: string;
  listtype: string;
};
const listItems: listItemType[] = [
  {
    title: "Set as planning",
    listtype: "planning",
  },
  { title: "Set as watching", listtype: "watching" },
];

interface MediaActionMenuProps {
  mediaid?: string;
  mediatype: mediaTypeType;
}

const MediaActionMenu = ({ mediaid, mediatype }: MediaActionMenuProps) => {
  const userid = useSelector((state: RootState) => state.auth.userid);

  const listHandler = async (listtype: string) => {
    const response = await addItemToList(mediatype, mediaid, userid, listtype);
    if (!response.error) {
      toast.success(response.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <ul className="*:px-4 *:py-2">
      {listItems.map((item: listItemType) => (
        <li
          key={item.title}
          className="hover:bg-actionPrimary cursor-pointer"
          onClick={listHandler.bind(this, item.listtype)}
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
