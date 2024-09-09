import React, { useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { AiFillHeart, AiOutlineDown } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";

import "tippy.js/dist/tippy.css";

import Button from "../../../../components/UI/Button";
import MediaActionMenu from "./MediaActionMenu";
import EntryEditorModal from "../../../../components/UI/EntryEditorModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toggleFav } from "../../../../lib/api/user";
import { useAppSelector } from "../../../../hooks/redux";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";
import {
  UserDocEntry,
  UserDocEntryGroup,
} from "../../../../constants/types/entry";
import { mediaTypeType } from "../../../../constants/types";
import { findExistingEntry } from "../../../../lib/helpers";
import { UserFav } from "../../../../constants/types/user";
import { MovieDetail, TvDetail } from "../../../../constants/types/media";

const Controls = () => {
  const { username } = useAppSelector((state) => state.auth);
  const tippyRef = useRef(null);

  const { pathname } = useLocation();
  const { mediaid: mediaidString } = useParams<{ mediaid: string }>();
  let mediaid: number = 0;
  if (mediaidString) {
    mediaid = parseInt(mediaidString);
  }
  const mediaType: mediaTypeType = pathname.split("/")[1] as mediaTypeType;

  const { data: mediaDetails } = useQuery<MovieDetail | TvDetail>({
    queryKey: ["media", mediaType, mediaid],
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

  const { data: profile } = useQuery<{
    entries: UserDocEntryGroup;
    fav: UserFav;
  }>({
    queryKey: ["user", username],
    enabled: username && username.length > 0 ? true : false,
  });

  let existingEntry: UserDocEntry | undefined;
  if (profile?.entries && mediaid) {
    existingEntry = findExistingEntry(profile.entries, mediaid, mediaType);
  }

  const isFav = profile?.fav[mediaType as keyof UserFav]?.includes(
    mediaid.toString()
  );
  const status = existingEntry?.status;
  let title = "Add to list";
  if (status) {
    title = status?.charAt(0).toUpperCase() + status?.slice(1);
  }

  const handleFavToggle = async (toFav: boolean) => {
    try {
      loadingBar.current?.continuousStart();
      await toggleFav(Number(mediaid), mediaType, toFav);
      loadingBar.current?.complete();

      showSuccessToast(
        toFav ? "Added to Favourites" : "Removed from Favourites"
      );

      queryClient.invalidateQueries({
        queryKey: ["user", username],
      });
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  return (
    <div className="grid grid-cols-[auto,35px] items-end col-span-2 w-full gap-4 mb-4">
      {mediaDetails && (
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
              ref={tippyRef}
              render={(attrs) => (
                <div {...attrs}>
                  <MediaActionMenu
                    {...{
                      currentStatus: existingEntry?.status,
                      setShowModal,
                      existingEntryId: existingEntry?._id,
                      tippyRef,
                      mediaType,
                      mediaDetails: {
                        title:
                          (mediaDetails as MovieDetail).title ??
                          (mediaDetails as TvDetail).name,
                        status: mediaDetails.status ?? "Released",
                        poster_path: mediaDetails.poster_path ?? "",
                        backdrop_path: mediaDetails.backdrop_path ?? "",
                        id: mediaDetails.id,
                      },
                    }}
                  />
                </div>
              )}
            >
              <div className="bg-actionSecondary p-2 h-full rounded-r-lg grid justify-center items-center cursor-pointer">
                <AiOutlineDown className="text-2xl" />
              </div>
            </Tippy>
          }
          classes="text-[1.4rem] font-normal"
          divClasses="h-[max-content] font-normal"
        />
      )}
      <div
        className="p-2 bg-favRed rounded grid items-center justify-center cursor-pointer h-fit md:h-full"
        onClick={() => handleFavToggle(!isFav)}
      >
        <AiFillHeart
          className={`text-2xl ${isFav ? "text-favPink" : "text-white"}`}
        />
      </div>
      {mediaid && (
        <EntryEditorModal
          {...{
            open: showModal,
            setOpen: setShowModal,
            id: existingEntry?._id,
            mediaid: Number(mediaid),
            mediaType,
          }}
        />
      )}
    </div>
  );
};

export default Controls;
