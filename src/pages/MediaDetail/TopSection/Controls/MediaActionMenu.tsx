import react from "react";
import { Dispatch, SetStateAction } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

import { addEntry } from "../../../../lib/api";
import { StatusType, mediaTypeType } from "../../../../constants/types";
import { attrsType } from "../../../../Layout/Navbar/BrowseDropdownMenu";
import { useAppSelector } from "../../../../hooks/redux";
import { updateEntry } from "../../../../lib/api/entry";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";
import { MovieDetail, TvDetail } from "../../../../constants/types/media";

type listItemType = {
  title: string;
  status: StatusType;
};
const menuItems: listItemType[] = [
  {
    title: "Set as Planning",
    status: "planning",
  },
  { title: "Set as Watching", status: "watching" },
  { title: "Set as Paused", status: "paused" },
  { title: "Set as Dropped", status: "dropped" },
  { title: "Set as Completed", status: "completed" },
];

interface Props {
  currentStatus?: string;
  attrs: attrsType;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  existingEntryId?: string;
  tippyRef: any;
}

const MediaActionMenu = ({
  currentStatus,
  attrs,
  setShowModal,
  existingEntryId,
  tippyRef,
}: Props) => {
  const { username } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: mediaTypeType = pathname.split("/")[1] as mediaTypeType;

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

  const { data: mediaDetails } = useQuery<MovieDetail | TvDetail>({
    queryKey: ["media", mediaType, mediaid],
  });

  let list = menuItems;
  if (mediaDetails && mediaDetails.status === "Post Production") {
    list = [
      {
        title: "Set as planning",
        status: "planning",
      },
    ];
  }

  const listHandler = async (
    listtype: StatusType,
    title: string,
    poster: string,
    backdrop: string
  ) => {
    try {
      let response;
      loadingBar.current?.continuousStart();
      if (existingEntryId) {
        response = await updateEntry({
          id: existingEntryId,
          status: listtype,
        });
      } else {
        response = await addEntry({
          mediaType,
          mediaid: Number(mediaid),
          status: listtype,
          title,
          poster,
          backdrop,
        });
      }
      loadingBar.current?.complete();

      tippyRef?.current?._tippy.hide();
      queryClient.invalidateQueries({
        queryKey: ["user", username],
      });
      showSuccessToast(response?.message);
    } catch (error: any) {
      loadingBar.current?.complete();

      tippyRef?.current?._tippy.hide();
      showErrorToast(error.message);
    }
  };

  return (
    <ul
      className="*:px-4 *:py-2 bg-white text-textLighter text-center text-2xl rounded py-2"
      {...attrs}
    >
      {mediaDetails &&
        list
          .filter((item) => item.status != currentStatus)
          .map((item: listItemType) => (
            <li
              key={item.title}
              className="hover:bg-actionPrimary hover:text-white cursor-pointer"
              onClick={() =>
                listHandler(
                  item.status,
                  mediaType === "movie"
                    ? (mediaDetails as MovieDetail).title
                    : (mediaDetails as TvDetail).name,
                  mediaDetails?.poster_path,
                  mediaDetails?.backdrop_path
                )
              }
            >
              {item.title}
            </li>
          ))}
      <hr />
      <li
        className="hover:bg-actionPrimary hover:text-white cursor-pointer"
        onClick={() => {
          setShowModal(true);
          tippyRef?.current?._tippy.hide();
        }}
      >
        Open List Editor
      </li>
    </ul>
  );
};

export default MediaActionMenu;
