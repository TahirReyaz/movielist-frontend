import React from "react";
import FileUpload from "../../../../components/UI/FileUpload";
import ImagePicker from "../../../../components/UI/ImagePicker";
import { toast } from "react-toastify";
import { getUserDetail, updateUserDetail } from "../../../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/AuthSlice";

const Avatar = () => {
  const { username, userid } = useSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: [`getUserProfile`],
    enabled: !!username,
    queryFn: () => getUserDetail(username),
  });

  const profileMutation = useMutation({
    mutationFn: (url: string | undefined) => {
      return updateUserDetail(userid, { avatar: url });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });

      toast.success(data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
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
