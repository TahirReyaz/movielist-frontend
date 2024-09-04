import React, { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { deleteEntry } from "../../../../lib/api/entry";
import { useAppSelector } from "../../../../hooks/redux";
import WarningModal from "../../WarningModal";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { useLocation } from "react-router-dom";
import { mediaTypeType } from "../../../../constants/types";

const CustomLists = ({
  id,
  setOpen,
}: {
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);

  const { username } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const { pathname } = useLocation();
  const pathArray = pathname?.split("/");
  const mediaType: mediaTypeType =
    pathArray?.[3]?.split("#")[0] === "movielist" ? "movie" : "tv";

  const handleDelete = async () => {
    try {
      const response = await deleteEntry(id);
      showSuccessToast(response.message);
      queryClient.invalidateQueries({
        queryKey: ["entries", username, mediaType],
      });
      setOpen(false);
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 pe-12 pb-12">
      <div>
        <p className="text-anilist-gray-gull text-xl text-start mb-8">
          Custom Lists
        </p>
        <div className="text-start">
          <span className="text-xl ms-8 text-anilist-gray-regent text-start">
            No custom lists
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className="px-8 py-4 bg-black/20 text-anilist-gray-athens_gray w-fit rounded hover:bg-anilist-mandy text-xl cursor-pointer"
          onClick={() => setOpenWarningModal(true)}
        >
          Delete
        </div>
      </div>
      <WarningModal
        {...{
          open: openWarningModal,
          setOpen: setOpenWarningModal,
          action: handleDelete,
          title: "Warning",
          message: "Are you sure you want to delete this list entry?",
          actionName: "OK",
        }}
      />
    </div>
  );
};

export default CustomLists;
