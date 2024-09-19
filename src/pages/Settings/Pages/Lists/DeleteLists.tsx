import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import WarningModalWithInput from "../../../../components/UI/WarningModal/WarningModalWithInput";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";
import { delUserMediaEntries } from "../../../../lib/api";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { MediaType } from "../../../../constants/types";
import { useAppSelector } from "../../../../hooks/redux";

const DeleteLists = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [currentMediaType, setCurrentMediaType] = useState<
    MediaType | undefined
  >();

  const { username } = useAppSelector((state) => state.auth);

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!currentMediaType) {
      return;
    }
    try {
      loadingBar.current?.continuousStart();
      await delUserMediaEntries(password, currentMediaType);
      loadingBar.current?.complete();

      showSuccessToast(`All ${currentMediaType} entries deleted`);
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ["user", username] });
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }

    setShowModal(false);
  };

  const handleClick = (mediaType: MediaType) => {
    setCurrentMediaType(mediaType);
    setShowModal(true);
  };

  return (
    <div className="mb-20">
      <hr className="text-anilist-gray-regent/50 mb-12" />
      <h3 className="text-2xl text-anilist-mandy font-medium mb-2">
        Delete List
      </h3>
      <p className="text-2xl text-anilist-gray-regent mb-4">
        Warning! This will permanently delete all your Movie or TV list entries
      </p>
      <div className="flex gap-6">
        <div
          className="rounded-md text-xl text-anilist-aqua_haze bg-anilist-mandy/80 my-8 p-4 px-6 w-fit cursor-pointer"
          onClick={() => handleClick("movie")}
        >
          Delete Movie List
        </div>
        <div
          className="rounded-md text-xl text-anilist-aqua_haze bg-anilist-mandy/80 my-8 p-4 px-6 w-fit cursor-pointer"
          onClick={() => handleClick("tv")}
        >
          Delete TV List
        </div>
      </div>

      <WarningModalWithInput
        {...{
          open: showModal,
          setOpen: setShowModal,
          title: `Delete ${currentMediaType} list`,
          message: "Please enter your password to confirm your list deletion",
          action: handleDelete,
          actionName: `OK, Delete my ${currentMediaType} list entries`,
          type: "password",
          placeholder: "Confirm Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
        }}
      />
    </div>
  );
};

export default DeleteLists;
