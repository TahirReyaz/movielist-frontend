import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { AiFillHeart, AiOutlineDown } from "react-icons/ai";

import "tippy.js/dist/tippy.css";

import { MediaDetailType } from "../..";
import Button from "../../../../components/UI/Button";
import MediaActionMenu from "./MediaActionMenu";
import { entryType } from "../../../../constants/types";
import EntryEditorModal from "../../../../components/UI/EntryEditorModal";
import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../../../../lib/api";

interface ControlsProps {
  mediaid: string;
  mediaDetails: MediaDetailType;
  username?: string;
}

const Controls = ({ mediaid, mediaDetails, username }: ControlsProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getUserDetail(username),
    enabled: !!username,
  });

  const existingEntry = profile?.entries?.find(
    (entry: any) => entry.mediaid === mediaid
  );
  let title: string = "Add to List";
  if (existingEntry) {
    let status = existingEntry.status;
    title = status.charAt(0).toUpperCase() + status.slice(1);
  }

  return (
    <div className="grid grid-cols-[auto,35px] w-full gap-4 mb-4">
      <Button
        title={title}
        type="button"
        onClick={() => setShowModal(true)}
        endElement={
          <Tippy
            interactive={true}
            placement="bottom-end"
            arrow
            trigger="click"
            render={(attrs) => (
              <MediaActionMenu
                {...{
                  mediaid,
                  mediaDetails,
                  currentStatus: existingEntry?.status,
                  attrs,
                }}
              />
            )}
            className="py-2 bg-white"
          >
            <div className="bg-actionSecondary p-2 h-full rounded-r-lg grid justify-center items-center cursor-pointer">
              <AiOutlineDown className="text-2xl" />
            </div>
          </Tippy>
        }
        classes="text-[1.4rem] font-normal"
      />
      <div className="p-2 bg-favRed rounded grid items-center justify-center">
        <AiFillHeart className="text-2xl" />
      </div>
      <EntryEditorModal
        {...{
          open: showModal,
          setOpen: setShowModal,
          id: existingEntry?.id,
          mediaid,
          mediaType: mediaDetails.first_air_date ? "tv" : "movie",
        }}
      />
    </div>
  );
};

export default Controls;
