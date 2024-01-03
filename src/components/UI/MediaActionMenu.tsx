import React from "react";

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
const MediaActionMenu = () => {
  return (
    <ul className="*:px-4 *:py-2">
      {listItems
        .filter((item: listItemType) => !item.separate)
        .map((item: listItemType) => (
          <li className="hover:bg-actionPrimary">{item.title}</li>
        ))}
      <hr />
      {listItems
        .filter((item: listItemType) => item.separate)
        .map((item: listItemType) => (
          <li className="hover:bg-actionPrimary">{item.title}</li>
        ))}
    </ul>
  );
};

export default MediaActionMenu;
