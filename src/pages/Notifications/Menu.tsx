import React, { Dispatch, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HiDotsHorizontal } from "react-icons/hi";

import { NotifType } from "../../constants/types";
import { useAppSelector } from "../../hooks/redux";
import { useLoadingBar } from "../../components/UI/LoadingBar";
import { markAllUserNotifsRead } from "../../lib/api";
import { showErrorToast } from "../../utils/toastUtils";
import MobileHeader from "../../components/Layout/MobileHeader";

interface MenuProps {
  currentOption: NotifType;
  setCurrentOption: Dispatch<React.SetStateAction<NotifType>>;
}

const Menu = ({ currentOption, setCurrentOption }: MenuProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { unreadNotifs, username } = useAppSelector((state) => state.auth);

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  const list: { title: string; type: NotifType }[] = [
    { title: "All", type: "all" },
    { title: "Airing", type: "airing" },
    { title: "Activity", type: "activity" },
    { title: "Forum", type: "forum" },
    { title: "Follows", type: "follows" },
    { title: "Media", type: "media" },
  ];

  const handleMarkRead = async () => {
    try {
      loadingBar.current?.continuousStart();
      await markAllUserNotifsRead();

      loadingBar.current?.complete();

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["user", username] });
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  return (
    <div className="col-span-1">
      <MobileHeader {...{ title: "Notifications", setShowMenu }} />
      {/* Menu */}
      {showMenu && (
        <div>
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
      )}
      <div
        onClick={handleMarkRead}
        className={`${
          unreadNotifs > 0
            ? "bg-anilist-blue-picton cursor-pointer"
            : "bg-anilist-gray-regent cursor-not-allowed"
        } text-anilist-aqua_haze text-xl text-center py-4 px-8 md:w-full rounded-md`}
      >
        Mark all as read
      </div>
    </div>
  );
};

export default Menu;
