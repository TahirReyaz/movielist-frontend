import React, { useState } from "react";
import { Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useQueryClient } from "@tanstack/react-query";

import userAvatar from "../../../assets/userAvatar.png";

import MarkdownEditor from "../../UI/Inputs/MarkdownEditor";
import { useAppSelector } from "../../../hooks/redux";
import { useLoadingBar } from "../../UI/LoadingBar";
import { showErrorToast } from "../../../utils/toastUtils";
import { createNewActivity } from "../../../lib/api/activity";

const NewActivity = ({
  location,
}: {
  location: "user" | "global" | "following";
}) => {
  const { username, profileData } = useAppSelector((state) => state.auth);
  const [content, setContent] = useState<string>("");
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    try {
      loadingBar.current?.continuousStart();
      await createNewActivity(content);

      loadingBar.current?.complete();
      if (location === "user" && username) {
        queryClient.invalidateQueries({
          queryKey: ["activities", "user", username],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["activities", location],
        });
      }
      setContent("");
      setShowEditor(false);
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  return (
    <div className="mb-4">
      {!showEditor && (
        <div
          className="p-4 bg-anilist-mirage text-2xl rounded cursor-text"
          onClick={() => setShowEditor(true)}
        >
          Write a status...
        </div>
      )}
      {showEditor && (
        <>
          <MarkdownEditor
            {...{
              value: content,
              onChange: (val) => setContent(val ?? ""),
              bgClass: "!bg-anilist-mirage",
            }}
          />
          {/* Preview */}
          {content.length > 0 && (
            <>
              <h2 className="text-2xl font-medium mt-8 mb-4 ps-4">Preview:</h2>
              <div className="bg-anilist-mirage rounded-t px-8 pt-8 flex gap-4 items-center">
                <Link to={`/user/${username}`} className="text-2xl">
                  <img
                    src={profileData?.avatar ?? userAvatar}
                    className="size-16 rounded object-cover"
                  />
                </Link>
                <Link to={`/user/${username}`} className="text-2xl">
                  {username}
                </Link>
              </div>
              <MDEditor.Markdown
                {...{
                  source: content,
                  className: "px-8 pb-8 pt-4 !bg-anilist-mirage rounded-b",
                }}
              />
            </>
          )}
          {/* Buttons */}
          <div className="w-full flex justify-end my-4">
            <Link
              to={"/terms"}
              className="text-xl hover:text-anilist-azure_radiance"
            >
              Please read the site guidelines before posting
            </Link>
          </div>
          <div className="flex w-full mb-12 justify-end">
            <div
              className="py-4 px-8 me-8 text-xl font-medium bg-anilist-mirage rounded cursor-pointer"
              onClick={() => setShowEditor(false)}
            >
              Cancel
            </div>
            <div
              className={`${
                content.length > 0
                  ? "bg-anilist-gray-gull"
                  : "bg-anilist-mirage"
              } py-4 px-8 text-xl text-anilist-aqua_haze font-medium rounded cursor-pointer`}
              onClick={handleSubmit}
            >
              Publish
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewActivity;
