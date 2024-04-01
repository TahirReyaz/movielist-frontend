import React from "react";
import FileUpload from "../../../../components/UI/FileUpload";

const Avatar = () => {
  return (
    <div>
      <FileUpload {...{ type: "image" }} />
    </div>
  );
};

export default Avatar;
