import React from "react";
import Tippy from "@tippyjs/react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCalendar, FaCheck } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { IconType } from "react-icons";

import "tippy.js/animations/shift-away.css";

import { toast } from "react-toastify";
import { addEntry } from "../../lib/api";
import { listtypetype } from "../../constants/types";
import { MediaDetailType } from "../../pages/MediaDetail";

const iconClass = "rounded-full bg-bgPrimary mb-2 me-2 p-1.5 opacity-90";

interface MediaCardButtonsProps {
  mediaDetails: MediaDetailType;
  userid: string;
  mediaid: string;
}

interface MenuButtonProps {
  setTo: string;
  Icon: IconType;
  status: listtypetype;
  onClick: (
    e: React.MouseEvent<HTMLDivElement>,
    status: listtypetype
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
  userid,
  mediaid,
}: MediaCardButtonsProps) => {
  const clickHandler = async (
    e: React.MouseEvent<HTMLDivElement>,
    status: listtypetype
  ) => {
    e.preventDefault();
    const response = await addEntry({
      mediaType: mediaDetails.first_air_date ? "tv" : "movie",
      mediaid,
      userid,
      status,
      title: mediaDetails.title,
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
