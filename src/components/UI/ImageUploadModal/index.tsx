import React from "react";
import { RxCross1 } from "react-icons/rx";
import TextInput from "../TextInput";

interface Props {
  closeModal: () => void;
  imageUrl: string;
  setImageUrl: React.Dispatch<string>;
  insertImage: () => void;
}

const ImageUploadModal = ({
  closeModal,
  imageUrl,
  setImageUrl,
  insertImage,
}: Props) => {
  return (
    <div className="bg-anilist-ebony_clay text-anilist-gray-gull w-screen md:w-[400px] p-8 align-center">
      <div className="flex justify-between">
        <h2 className="text-3xl">Add Image</h2>
        <RxCross1
          className="hover:text-anilist-azure_radiance cursor-pointer"
          onClick={closeModal}
        />
      </div>
      <p className="text-2xl my-8 text-start">Please Input the image URL</p>

      <TextInput
        {...{
          value: imageUrl,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setImageUrl(e.target.value),
          name: "imageUpload",
          type: "text",
        }}
      />
      <div className="flex justify-end gap-4">
        <div
          className="px-6 py-3 bg-black/40 text-anilist-gray-athens_gray w-fit roundedtext-xl cursor-pointer"
          onClick={closeModal}
        >
          Cancel
        </div>
        <div
          className="px-6 py-3 bg-anilist-blue-picton text-anilist-gray-athens_gray w-fit rounded text-xl cursor-pointer"
          onClick={insertImage}
        >
          OK
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
