import React, { useState } from "react";

import { uploadImage } from "../../lib/api";
import { ACCEPTED_IMAGE_TYPES, TImageKind } from "../../lib/api/upload";
import { showErrorToast } from "../../utils/toastUtils";

interface ImagePickerProps {
  src: string | undefined;
  onUpload: (url: string) => void;
  /** which image this is: decides size/crop and where it's stored */
  kind: TImageKind;
  name: string;
}

const ImagePicker = ({ src, onUpload, kind, name }: ImagePickerProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file || uploading) return;
    try {
      setUploading(true);
      const url = await uploadImage(file, kind);
      onUpload(url);
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
    // allow picking the same file again
    e.target.value = "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Picker */}
      <div className="bg-bgTertiary rounded p-4 size-80 cursor-pointer">
        <div
          className="drop-area w-full h-full text-2xl p-8 text-center border-dashed border-2 border-textPrimary flex items-center justify-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(", ")}
            onChange={handleFileInputChange}
            className="hidden"
            id={name}
            disabled={uploading}
          />
          <label htmlFor={name}>
            {uploading ? "Uploading..." : "Drop image here or click to upload"}
          </label>
        </div>
      </div>
      {/* Preview */}
      {src && (
        <div className={`image-preview size-80 mt-4`}>
          <img
            src={src}
            alt="Image Preview"
            className="w-full h-full object-cover object-center rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
