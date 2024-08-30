import React, { useState } from "react";
import TextInput from "../../UI/TextInput";
import { Link } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { commentOnActivity } from "../../../lib/api/comment";
import { useLoadingBar } from "../../UI/LoadingBar";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../../hooks/redux";

const NewComment = ({ activityId }: { activityId: string }) => {
  const [content, setContent] = useState<string>("");
  const [showInterface, setShowInterface] = useState<boolean>(false);
  const profile = useAppSelector((state) => state.profile);

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  const handlePublish = async () => {
    if (content.length > 0) {
      try {
        loadingBar.current?.continuousStart();
        await commentOnActivity(activityId, content);
        loadingBar.current?.complete();
        if (profile.username) {
          queryClient.invalidateQueries({
            queryKey: ["activities", "user", profile.username],
          });
        }
        queryClient.invalidateQueries({
          queryKey: ["activities", "global"],
        });
        queryClient.invalidateQueries({
          queryKey: ["activities", "following"],
        });
        setShowInterface(false);
        setContent("");
      } catch (error: any) {
        loadingBar.current?.complete();
        showErrorToast(error.message);
      }
    } else {
      showErrorToast("The text field is required");
    }
  };

  return (
    <div className="px-8">
      <TextInput
        {...{
          value: content,
          onChange: (e) => setContent(e.target.value),
          name: "new-comment",
          type: "text",
          onClick: () => (!showInterface ? setShowInterface(true) : {}),
          bg: "bg-anilist-mirage",
        }}
      />
      {showInterface && (
        <>
          <div className="w-full flex justify-end my-4">
            <Link
              to={"/terms"}
              className="text-xl hover:text-anilist-azure_radiance"
            >
              Please read the site guidelines before posting
            </Link>
          </div>
          {/* Buttons */}
          <div className="flex w-full mb-12 justify-end">
            <div
              className="py-4 px-8 me-8 text-xl font-medium bg-anilist-mirage rounded cursor-pointer"
              onClick={() => setShowInterface(false)}
            >
              Cancel
            </div>
            <div
              className="py-4 px-8 text-xl text-anilist-aqua_haze font-medium bg-anilist-blue-picton rounded cursor-pointer"
              onClick={handlePublish}
            >
              Publish
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewComment;
