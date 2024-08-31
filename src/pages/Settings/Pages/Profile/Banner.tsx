import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import ImagePicker from "../../../../components/UI/ImagePicker";
import { updateUserDetail } from "../../../../lib/api";
import { RootState } from "../../../../store";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";

const Banner = () => {
  const { username, profileData, userid } = useSelector(
    (state: RootState) => state.auth
  );

  console.log({ profileData });

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

  const profileMutation = useMutation({
    mutationFn: (url: string | undefined) => {
      loadingBar.current?.continuousStart();
      return updateUserDetail(userid, { banner: url });
    },
    onSuccess: (data) => {
      loadingBar.current?.complete();
      queryClient.invalidateQueries({ queryKey: ["user", username] });

      showSuccessToast(data.message);
      return;
    },
    onError: (error) => {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    },
  });

  return (
    <div>
      <ImagePicker
        {...{
          src: profileData?.banner,
          onUpload: (url: string) => profileMutation.mutate(url),
          uploadPath: "user-banner",
          name: "banner-upload",
        }}
      />
    </div>
  );
};

export default Banner;
