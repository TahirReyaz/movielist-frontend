import React, { useEffect, useState } from "react";
import TextInput from "../../../../components/UI/TextInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetail, updateUserDetail } from "../../../../lib/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/AuthSlice";
import Loading from "../../../../components/UI/Loading";
import Button from "../../../../components/UI/Button";
import { toast } from "react-toastify";

const About = () => {
  const [about, setAbout] = useState<string>("");

  const { username, userid } = useSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: [`getUserProfile`],
    enabled: !!username,
    queryFn: () => getUserDetail(username),
  });

  const profileMutation = useMutation({
    mutationFn: (about: string | undefined) => {
      return updateUserDetail(userid, { about });
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

  useEffect(() => {
    if (profileQuery.isFetched && profileQuery.data.about) {
      if (profileQuery.data.about !== about) {
        setAbout(profileQuery.data.about);
      }
    }
  }, [profileQuery.data?.about]);

  console.log({ abt: profileQuery.data?.about });

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
      {profileQuery.data.about !== about && about !== "" && (
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
