import React, { useState } from "react";

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
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
      {selectedImage && (
        <div className="image-preview size-80 mt-4">
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-full object-cover object-center rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
