import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCalendar, FaCheck } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { IconType } from "react-icons";

import "tippy.js/animations/shift-away.css";

import { addEntry } from "../../lib/api";
import { StatusType, mediaTypeType } from "../../constants/types";
import { MediaDetailType } from "../../pages/MediaDetail";
import { useAppSelector } from "../../hooks/redux";
import { updateEntry } from "../../lib/api/entry";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { useLoadingBar } from "./LoadingBar";

const iconClass = "rounded-full bg-bgPrimary mb-2 me-2 p-1.5 opacity-90";

interface MediaCardButtonsProps {
  mediaDetails: MediaDetailType;
  mediaid: string;
  mediaType: mediaTypeType;
  entry?: any;
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
      animation="shift-away"
      content={`Set to ${setTo}`}
      className="bg-bgPrimary opacity-90"
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
  entry,
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
      let response;
      if (entry) {
        response = await updateEntry({ status, id: entry.id });
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
      animation="shift-away"
      content={
        <div>
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
      }
      className="bg-transparent"
    >
      <div className={iconClass + " absolute bottom-0 right-0 "}>
        <AiOutlinePlus />
      </div>
    </Tippy>
  );
};

export default MediaCardButtons;
