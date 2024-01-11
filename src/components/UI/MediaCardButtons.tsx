import React from "react";
import Tippy from "@tippyjs/react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCalendar, FaCheck } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { IconType } from "react-icons";

import "tippy.js/animations/shift-away.css";

const iconClass = "rounded-full bg-bgPrimary mb-2 me-2 p-1.5 opacity-90";

interface MenuButtonProps {
  setTo: string;
  Icon: IconType;
}

const MenuButton = ({ setTo, Icon }: MenuButtonProps) => {
  return (
    <Tippy
      interactive={false}
      placement="left"
      arrow={false}
      animation="shift-away"
      content={`Set to ${setTo}`}
      className="bg-bgPrimary opacity-90"
    >
      <div className={iconClass}>
        <Icon />
      </div>
    </Tippy>
  );
};

const MediaCardButtons = () => {
  return (
    <Tippy
      interactive={true}
      placement="top"
      arrow={false}
      animation="shift-away"
      content={
        <div>
          <MenuButton {...{ setTo: "Watching", Icon: IoPlay }} />
          <MenuButton {...{ setTo: "Complted", Icon: FaCheck }} />
          <MenuButton {...{ setTo: "Planning", Icon: FaCalendar }} />
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
