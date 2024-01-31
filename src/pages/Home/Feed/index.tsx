import React, { useState } from "react";
import TextInput from "../../../components/UI/TextInput";
import Button from "../../../components/UI/Button";

const Feed = () => {
  const [newActivity, setNewActivity] = useState<string>("");
  const [isGlobal, setIsGlobal] = useState<boolean>(true);

  return (
    <section className="w-7/12">
      <div className="flex justify-between">
        <h2 className="text-[1.4rem] font-medium px-4 py-2">Activity</h2>
        <div className="flex">
          <div
            className={`font-normal text-xl py-2 px-4 rounded hover:text-actionPrimary cursor-pointer ${
              !isGlobal ? "bg-bgSecondary" : "bg-bgFooter"
            }`}
            onClick={() => setIsGlobal(false)}
          >
            Following
          </div>
          <div
            className={`font-normal text-xl py-2 px-4 rounded hover:text-actionPrimary cursor-pointer ${
              isGlobal ? "bg-bgSecondary" : "bg-bgFooter"
            }`}
            onClick={() => setIsGlobal(true)}
          >
            Global
          </div>
        </div>
      </div>
      <div>
        <TextInput
          {...{
            name: "newActivity",
            label: "Write a status...",
            value: newActivity,
            onChange: (e) => setNewActivity(e.target.value),
            type: "text",
            classes: "bg-bgSecondary",
          }}
        />
      </div>
      <div>
        <div className="bg-bgSecondary p-6">
          <p className="text-[1.4rem] rounded">No global activity yet</p>
        </div>
      </div>
    </section>
  );
};

export default Feed;
