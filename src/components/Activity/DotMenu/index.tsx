import React from "react";
import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaLink } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from "../../../hooks/redux";

const DotMenu = ({
  id,
  onDel,
  username: activityUsername,
}: {
  id: string;
  onDel: () => void;
  username: string;
}) => {
  const { username } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const options = [
    {
      label: "Direct Link",
      Icon: FaLink,
      action: () => navigate(`/activity/${id}`),
    },
  ];

  if (username === activityUsername) {
    options.push({ label: "Delete", Icon: RxCross2, action: () => onDel() });
  }

  return (
    <Tippy
      interactive={true}
      placement="bottom"
      trigger="click"
      arrow={false}
      render={(attrs) => (
        <ul className="bg-anilist-aqua_haze rounded py-2" {...attrs}>
          {options.map(({ label, Icon, action }) => (
            <li
              {...{
                onClick: () => {
                  action();
                },
                className:
                  "cursor-pointer p-4 text-xl font-medium text-anilist-gray-gull flex gap-4 hover:bg-anilist-blue-picton hover:text-anilist-aqua_haze",
                key: label,
              }}
            >
              <Icon /> {label}
            </li>
          ))}
        </ul>
      )}
    >
      <div>
        <HiDotsHorizontal
          {...{
            className: "cursor-pointer text-3xl hover:text-anilist-blue-picton",
          }}
        />
      </div>
    </Tippy>
  );
};

export default DotMenu;
