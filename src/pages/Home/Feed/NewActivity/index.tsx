import React, { useState } from "react";
import TextInput from "../../../../components/UI/TextInput";

const NewActivity = () => {
  const [newActivity, setNewActivity] = useState<string>("");
  return (
    <div className="mb-4">
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
  );
};

export default NewActivity;
