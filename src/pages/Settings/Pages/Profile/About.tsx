import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import TextInput from "../../../../components/UI/TextInput";
import { getUserDetail, updateUserDetail } from "../../../../lib/api";
import { RootState } from "../../../../store";
import Loading from "../../../../components/UI/Loading";
import Button from "../../../../components/UI/Button";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";

const About = () => {
  const [about, setAbout] = useState<string>("");

  const { username, profileData } = useSelector(
    (state: RootState) => state.auth
  );
  const userid = profileData?._id;

  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: [`getUserProfile`, username],
    enabled: !!username,
    queryFn: () => getUserDetail(username),
  });

  const profileMutation = useMutation({
    mutationFn: (about: string | undefined) => {
      return updateUserDetail(userid, { about });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getUserProfile", username] });
      showSuccessToast(data.message);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  useEffect(() => {
    if (profileQuery.isFetched && profileQuery.data.about) {
      if (profileQuery.data.about !== about) {
        setAbout(profileQuery.data.about);
      }
    }
  }, [profileQuery.data?.about]);

  if (profileQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <TextInput
        {...{
          name: "about",
          value: about,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setAbout(event.target.value);
          },
          type: "text",
          label: "",
        }}
      />
      {profileQuery.data?.about !== about && about !== "" && (
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
