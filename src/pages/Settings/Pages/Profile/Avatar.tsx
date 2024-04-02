import React from "react";
import FileUpload from "../../../../components/UI/FileUpload";
import ImagePicker from "../../../../components/UI/ImagePicker";

const Avatar = () => {
  return (
    <div>
      {/* <FileUpload {...{ type: "image" }} /> */}
      <ImagePicker />
    </div>
  );
};

export default Avatar;
