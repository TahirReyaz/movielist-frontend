import React, { Dispatch } from "react";
import { NotifType } from "../../constants/types";

interface MenuProps {
  currentOption: NotifType;
  setCurrentOption: Dispatch<React.SetStateAction<NotifType>>;
}

const Menu = ({ currentOption, setCurrentOption }: MenuProps) => {
  const list: { title: string; type: NotifType }[] = [
    { title: "All", type: "all" },
    { title: "Airing", type: "airing" },
    { title: "Activity", type: "activity" },
    { title: "Forum", type: "forum" },
    { title: "Follows", type: "follows" },
    { title: "Media", type: "media" },
  ];

  return (
    <div className="col-span-1">
      <h5 className="text-xl font-normal">Notifications</h5>
      <ul className="flex flex-col mb-4">
        {list.map(({ type, title }) => (
          <li
            className={`px-4 py-1 my-2 cursor:pointer text-xl rounded font-medium cursor-pointer ${
              currentOption == type ? "bg-anilist-mirage" : ""
            }`}
            key={title}
            onClick={() => setCurrentOption(type)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
