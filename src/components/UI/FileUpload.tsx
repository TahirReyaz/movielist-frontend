import React from "react";

interface FileUploadProps {
  type: string;
}

const FileUpload = ({ type }: FileUploadProps) => {
  return (
    <div className="bg-bgTertiary rounded p-4 size-80 cursor-pointer">
      <div className="w-full h-full text-2xl p-8 text-center border-dashed border-2 border-textPrimary flex items-center justify-center">
        Drop {type} here or click to upload
      </div>
    </div>
  );
};

export default FileUpload;
