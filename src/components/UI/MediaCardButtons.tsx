import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import Tippy from "@tippyjs/react/headless";
import { FaCalendar, FaCheck, FaPlus } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { IconType } from "react-icons";

import "tippy.js/animations/shift-away.css";

import { addEntry } from "../../lib/api";
import { StatusType, MediaType } from "../../constants/types";
import { MediaDetailType } from "../../pages/MediaDetail";
import { useAppSelector } from "../../hooks/redux";
import { updateEntry } from "../../lib/api/entry";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { useLoadingBar } from "./LoadingBar";
import { Entry } from "../../constants/types/entry";

const iconClass =
  "rounded-full bg-anilist-mirage/90 mt-4 me-2 p-2 text-2xl text-anilist-aqua_haze";

interface MediaCardButtonsProps {
  mediaDetails: MediaDetailType;
  mediaid: string;
  mediaType: MediaType;
  entryId?: string;
}

interface MenuButtonProps {
  setTo: string;
  Icon: IconType;
  status: StatusType;
  onClick: (
    e: React.MouseEvent<HTMLDivElement>,
    status: StatusType
  ) => Promise<void>;
}

const MenuButton = ({ setTo, Icon, onClick, status }: MenuButtonProps) => {
  return (
    <Tippy
      interactive={false}
      placement="left"
      arrow={false}
      render={(attrs) => (
        <span
          className="bg-anilist-mirage/90 rounded text-xl text-anilist-aqua_haze font-medium py-2 px-4"
          {...attrs}
        >{`Set to ${setTo}`}</span>
      )}
    >
      <div className={iconClass + " z-30 "} onClick={(e) => onClick(e, status)}>
        <Icon />
      </div>
    </Tippy>
  );
};

const MediaCardButtons = ({
  mediaDetails,
  mediaid,
  mediaType,
  entryId,
}: MediaCardButtonsProps) => {
  const { username } = useAppSelector((state) => state.auth);

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

  const clickHandler = async (
    e: React.MouseEvent<HTMLDivElement>,
    status: StatusType
  ) => {
    e.preventDefault();
    const title =
      mediaType === "tv" ? mediaDetails.name ?? "" : mediaDetails.title ?? "";
    try {
      loadingBar.current?.continuousStart();
      let response;
      if (entryId) {
        response = await updateEntry({ status, id: entryId });
      } else {
        response = await addEntry({
          mediaType,
          mediaid,
          status,
          title,
          poster: mediaDetails.poster_path,
          backdrop: mediaDetails.backdrop_path,
        });
      }

      loadingBar.current?.complete();
      queryClient.invalidateQueries({ queryKey: ["user", username] });

      showSuccessToast(response?.message);
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  return (
    <Tippy
      interactive={true}
      placement="top"
      arrow={false}
      render={(attrs) => (
        <div {...attrs}>
          <MenuButton
            {...{
              setTo: "Watching",
              status: "watching",
              Icon: IoPlay,
              onClick: clickHandler,
            }}
          />
          <MenuButton
            {...{
              setTo: "Completed",
              status: "completed",
              Icon: FaCheck,
              onClick: clickHandler,
            }}
          />
          <MenuButton
            {...{
              setTo: "Planning",
              status: "planning",
              Icon: FaCalendar,
              onClick: clickHandler,
            }}
          />
        </div>
      )}
    >
      <div className={iconClass + " absolute bottom-0 right-0 mt-0 mb-2"}>
        <FaPlus />
      </div>
    </Tippy>
  );
};

export default MediaCardButtons;
