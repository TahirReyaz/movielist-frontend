import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Modal from "../Modal";
import Button from "../../UI/Button";
import { showErrorToast } from "../../../utils/toastUtils";
import { FaImage } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import ImageUploadModal from "../ImageUploadModal";

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string | undefined) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setImageUrl("");
  };

  // Function to validate image URL
  const isValidImageUrl = (url: string) => {
    return /\.(jpeg|jpg|gif|png|webp)$/.test(url);
  };

  // Function to insert image
  const insertImage = () => {
    if (isValidImageUrl(imageUrl)) {
      onChange(`${value} ![Image](${imageUrl})`);
      closeModal();
    } else {
      showErrorToast("Invalid image URL. Please provide a valid URL.");
    }
  };

  // Custom command for inserting image
  const imageCommand = {
    name: "image",
    keyCommand: "image",
    buttonProps: { "aria-label": "Insert image" },
    icon: <FaImage />,
    execute: () => openModal(),
  };

  return (
    <div>
      <MDEditor
        {...{
          value,
          onChange,
          extraCommands: [imageCommand],
        }}
      />

      <Modal
        {...{
          open: isModalOpen,
          setOpen: setIsModalOpen,
        }}
      >
        <ImageUploadModal
          {...{
            imageUrl,
            setImageUrl,
            closeModal,
            insertImage,
          }}
        />
      </Modal>
    </div>
  );
};

export default MarkdownEditor;
