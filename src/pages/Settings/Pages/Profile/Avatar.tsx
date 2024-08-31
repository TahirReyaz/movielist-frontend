import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import ImagePicker from "../../../../components/UI/ImagePicker";
import { updateUserDetail } from "../../../../lib/api";
import { RootState } from "../../../../store";
import { changeDpAction } from "../../../../store/AuthSlice";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";

const Avatar = () => {
  const { username, profileData, userid } = useSelector(
    (state: RootState) => state.auth
  );

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();
  const dispatch = useDispatch();

  const profileMutation = useMutation({
    mutationFn: (url: string | undefined) => {
      loadingBar.current?.continuousStart();
      return updateUserDetail(userid, { avatar: url });
    },
    onSuccess: (data) => {
      loadingBar.current?.complete();
      queryClient.invalidateQueries({ queryKey: ["user", username] });
      dispatch(changeDpAction(data));

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
          src: profileData?.avatar,
          onUpload: (url: string) => profileMutation.mutate(url),
        }}
      />
    </div>
  );
};

export default Avatar;
