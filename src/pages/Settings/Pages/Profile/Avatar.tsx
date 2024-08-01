import React from "react";
import FileUpload from "../../../../components/UI/FileUpload";
import ImagePicker from "../../../../components/UI/ImagePicker";
import { toast } from "react-toastify";
import { getUserDetail, updateUserDetail } from "../../../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { changeDpAction } from "../../../../store/AuthSlice";

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
      dispatch(changeDpAction({ avatar: data.avatar }));

      toast.success(data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
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
