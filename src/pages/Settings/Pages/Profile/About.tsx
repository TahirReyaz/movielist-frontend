import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import TextInput from "../../../../components/UI/TextInput";
import { updateUserDetail } from "../../../../lib/api";
import { RootState } from "../../../../store";
import Button from "../../../../components/UI/Button";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";
import MarkdownEditor from "../../../../components/UI/Inputs/MarkdownEditor";

const About = () => {
  const [about, setAbout] = useState<string>("");
  const editor = useRef(null);

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
      {/* <TextInput
        {...{
          name: "about",
          value: about,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setAbout(event.target.value);
          },
          type: "text",
          label: "",
        }}
      /> */}
      {profileData && profileData.about !== about && about !== "" && (
        <div>
          <div className="bg-bgPrimary w-full text-[1.4rem] rounded-md border-0 py-4 pl-6 pr-20 my-8 text-gray-900 placeholder:text-gray-400 ">
            {about}
          </div>
          <Button
            {...{
              type: "button",
              title: "Save",
              classes: "px-4 py-4 w-fit",
              divClasses: "w-fit",
              onClick: () => profileMutation.mutate(about),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default About;
