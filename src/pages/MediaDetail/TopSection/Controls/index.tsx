import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { AiFillHeart, AiOutlineDown } from "react-icons/ai";

import "tippy.js/dist/tippy.css";

import { MediaDetailType } from "../..";
import Button from "../../../../components/UI/Button";
import MediaActionMenu from "./MediaActionMenu";
import EntryEditorModal from "../../../../components/UI/EntryEditorModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetail } from "../../../../lib/api";
import { toggleFav } from "../../../../lib/api/user";
import { toast } from "react-toastify";

interface ControlsProps {
  mediaid: string;
  mediaDetails: MediaDetailType;
  username?: string;
  userid: string;
  mediaType: string;
}

const Controls = ({
  mediaid,
  mediaDetails,
  username,
  userid,
  mediaType,
}: ControlsProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getUserDetail(username),
    enabled: !!username,
  });

  const queryClient = useQueryClient();

  const existingEntry = profile?.entries?.find(
    (entry: any) => entry.mediaid === mediaid
  );
  let title: string = "Add to List";
  if (existingEntry) {
    let status = existingEntry.status;
    title = status.charAt(0).toUpperCase() + status.slice(1);
  }

  const handleFavToggle = async (toFav: boolean) => {
    const res = await toggleFav(userid, mediaid, mediaType, toFav);
    if (!res.error) {
      toast.success(toFav ? "Added to Favourites" : "Removed from Favourites", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["profile", username],
      });
    } else {
      toast.error(res.messsage, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  useEffect(() => {
    if (profile && profile.fav) {
      const foundFav = profile.fav[mediaType].includes(mediaid);
      if (foundFav) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
  }, [profile]);

  return (
    <div className="grid grid-cols-[auto,35px] col-span-2 w-full gap-4 mb-4">
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
                  setShowModal,
                  mediaType,
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
        divClasses="h-[max-content]"
      />
      <div
        className="p-2 bg-favRed rounded grid items-center justify-center cursor-pointer h-fit md:h-full"
        onClick={() => handleFavToggle(!isFav)}
      >
        <AiFillHeart
          className={`text-2xl ${isFav ? "text-favPink" : "text-white"}`}
        />
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
