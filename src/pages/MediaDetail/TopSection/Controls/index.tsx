import React from "react";
import Tippy from "@tippyjs/react";
import { AiFillHeart, AiOutlineDown } from "react-icons/ai";
import { useSelector } from "react-redux";

import "tippy.js/dist/tippy.css";

import { MediaDetailType } from "../..";
import Button from "../../../../components/UI/Button";
import MediaActionMenu from "./MediaActionMenu";
import { RootState } from "../../../../store/AuthSlice";

interface ControlsProps {
  mediaid?: string;
  mediaDetails: MediaDetailType;
}

const Controls = ({ mediaid, mediaDetails }: ControlsProps) => {
  // const { lists } = useSelector((state: RootState) => state.auth);
  // let status = ""
  // if(lists) {

  // }

  return (
    <div className="flex w-full gap-2 mb-4">
      <Button
        title="Add to List"
        type="button"
        endElement={
          <Tippy
            interactive={true}
            placement="bottom-end"
            arrow={true}
            trigger="click"
            content={
              <MediaActionMenu
                {...{
                  mediaid,
                  mediaDetails,
                }}
              />
            }
            className="py-2 bg-white"
          >
            <div className="bg-actionSecondary p-2 h-full rounded-r-lg">
              <AiOutlineDown />
            </div>
          </Tippy>
        }
      />
      <div className="p-2 bg-red rounded">
        <AiFillHeart />
      </div>
    </div>
  );
};

export default Controls;
