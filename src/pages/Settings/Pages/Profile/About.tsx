import React, { useState } from "react";
import TextInput from "../../../../components/UI/TextInput";
import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../../../../lib/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/AuthSlice";
import Loading from "../../../../components/UI/Loading";
import Button from "../../../../components/UI/Button";

const About = () => {
  const [about, setAbout] = useState<string>("");

  const { username } = useSelector((state: RootState) => state.auth);

  const profileQuery = useQuery({
    queryKey: [`getUserProfile`],
    queryFn: () => getUserDetail(username),
  });

  if (profileQuery.isFetched) {
    if (profileQuery.data.bio) {
      setAbout(profileQuery.data.bio);
    }
  }

  if (profileQuery.isLoading) {
    return <Loading />;
  }

  const handleSave = () => {};

  console.log(about, profileQuery.data.bio);

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
      {profileQuery.isFetched &&
        profileQuery.data.bio &&
        profileQuery.data.bio !== about && (
          <div>
            <div>{about}</div>
            <div className="w-1/4 self-center my-4">
              <Button
                {...{
                  type: "button",
                  title: "Save",
                  classes: "px-0 py-4",
                  onClick: handleSave,
                }}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default About;
