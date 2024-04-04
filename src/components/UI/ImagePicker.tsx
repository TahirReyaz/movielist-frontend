import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

import { storage } from "../../firebase";
import { RootState } from "../../store/AuthSlice";

interface ImagePickerProps {
  src: string | undefined;
  onUpload: (url: string) => void;
}

const ImagePicker = ({ src, onUpload }: ImagePickerProps) => {
  const { username } = useSelector((state: RootState) => state.auth);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const imageRef = ref(storage, `user-avatar/${username}-${v4()}`);
      const uploadedImg = await uploadBytes(imageRef, file);
      const uploadedImgRef = ref(storage, uploadedImg.metadata.fullPath);
      const imgUrl = await getDownloadURL(uploadedImgRef);
      onUpload(imgUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageRef = ref(storage, `user-avatar/${username}-${v4()}`);
      const uploadedImg = await uploadBytes(imageRef, file);
      const uploadedImgRef = ref(storage, uploadedImg.metadata.fullPath);
      const imgUrl = await getDownloadURL(uploadedImgRef);
      onUpload(imgUrl);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-bgTertiary rounded p-4 size-80 cursor-pointer">
        <div
          className="drop-area w-full h-full text-2xl p-8 text-center border-dashed border-2 border-textPrimary flex items-center justify-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileInputChange}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input">Drop image here or click to upload</label>
        </div>
      </div>
      {src && (
        <div className="image-preview size-80 mt-4">
          <img
            src={src}
            alt="Avatar Preview"
            className="w-full h-full object-cover object-center rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
