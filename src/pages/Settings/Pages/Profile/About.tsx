import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";

import { updateUserDetail } from "../../../../lib/api";
import { RootState } from "../../../../store";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";
import MarkdownEditor from "../../../../components/UI/Inputs/MarkdownEditor";

const About = () => {
  const [about, setAbout] = useState<string>("");

  const { username, profileData, userid } = useSelector(
    (state: RootState) => state.auth
  );

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

  const profileMutation = useMutation({
    mutationFn: (about: string | undefined) => {
      loadingBar.current?.continuousStart();
      return updateUserDetail(userid, { about });
    },
    onSuccess: (data) => {
      loadingBar.current?.complete();
      queryClient.invalidateQueries({ queryKey: ["user", username] });
      showSuccessToast(data.message);
    },
    onError: (error) => {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    },
  });

  useEffect(() => {
    if (profileData?.about) {
      if (profileData.about !== about) {
        setAbout(profileData.about);
      }
    }
  }, [profileData]);

  return (
    <div>
      <MarkdownEditor
        {...{
          value: about,
          onChange: (val) => setAbout(val ?? ""),
        }}
      />
      {profileData && profileData.about !== about && about !== "" && (
        <div>
          <MDEditor.Markdown
            {...{
              source: about,
              className: "p-4 !bg-anilist-white_firefly my-8",
            }}
          />
          <div
            className="px-6 py-3 rounded-lg bg-anilist-blue-picton text-2xl text-anilist-aqua_haze w-fit cursor-pointer"
            onClick={() => profileMutation.mutate(about)}
          >
            Save
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
