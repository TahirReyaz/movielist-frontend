import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAppSelector } from "../../../../hooks/redux";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { updateStats } from "../../../../lib/api";

const UpdateStats = () => {
  const { username } = useAppSelector((state) => state.auth);

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  const handleUpdate = async () => {
    try {
      loadingBar.current?.continuousStart();
      await updateStats();
      loadingBar.current?.complete();
      showSuccessToast("Stats Updated");

      queryClient.invalidateQueries({ queryKey: ["user", username] });
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  return (
    <div
      className="text-xl text-anilist-aqua_haze font-medium rounded-md bg-anilist-blue-picton py-4 px-6 cursor-pointer w-fit"
      onClick={handleUpdate}
    >
      Update Stats
    </div>
  );
};

export default UpdateStats;
