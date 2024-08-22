import React from "react";
import ImagePicker from "../../../../components/UI/ImagePicker";
import { getUserDetail, updateUserDetail } from "../../../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { changeDpAction } from "../../../../store/AuthSlice";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";

const Avatar = () => {
  const { username, profileData } = useSelector(
    (state: RootState) => state.auth
  );
  const userid = profileData?._id;

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const profileQuery = useQuery({
    queryKey: ["profile", username],
    enabled: !!username,
    queryFn: () => getUserDetail(username),
  });

  const profileMutation = useMutation({
    mutationFn: (url: string | undefined) => {
      return updateUserDetail(userid, { avatar: url });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
      dispatch(changeDpAction(data));

      showSuccessToast(data.message);
      return;
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  return (
    <div>
      {/* <FileUpload {...{ type: "image" }} /> */}
      <ImagePicker
        {...{
          src: profileQuery.data?.avatar,
          onUpload: (url: string) => profileMutation.mutate(url),
        }}
      />
    </div>
  );
};

export default Avatar;
