import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/AuthSlice";

type listItemType = {
  title: string;
  listtype?: string;
  separate?: boolean;
};
const listItems: listItemType[] = [
  {
    title: "Set as planning",
    listtype: "planning",
  },
  { title: "Set as watching", listtype: "watching" },
  {
    title: "Open List Editor",
    separate: true,
  },
];

interface MediaActionMenuProps {
  mediaid?: string;
  mediatype: string;
}

const MediaActionMenu = ({ mediaid, mediatype }: MediaActionMenuProps) => {
  const userid = useSelector((state: RootState) => state.auth.userid);
  return (
    <ul className="*:px-4 *:py-2">
      {listItems
        .filter((item: listItemType) => !item.separate)
        .map((item: listItemType) => (
          <li
            key={item.title}
            className="hover:bg-actionPrimary cursor-pointer"
            onClick={() =>
              console.log({
                userid,
                listtype: item.listtype,
                mediaid,
                mediatype,
              })
            }
          >
            {item.title}
          </li>
        ))}
      <hr />
      {listItems
        .filter((item: listItemType) => item.separate)
        .map((item: listItemType) => (
          <li key={item.title} className="hover:bg-actionPrimary">
            {item.title}
          </li>
        ))}
    </ul>
  );
};

export default MediaActionMenu;
