import React, { useState } from "react";
import MDEditor, { executeCommand, getCommands } from "@uiw/react-md-editor";
import { FaImage } from "react-icons/fa";

import Modal from "../Modal";
import { showErrorToast } from "../../../utils/toastUtils";
import ImageUploadModal from "../ImageUploadModal";

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string | undefined) => void;
  bgClass?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  bgClass,
}) => {
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

  const customCommands = getCommands().filter(
    (command) =>
      !["checked-list", "table", "image", "comment", "codeBlock"].includes(
        command.name ?? ""
      )
  );

  return (
    <div>
      <MDEditor
        {...{
          value,
          onChange,
          commands: customCommands,
          extraCommands: [imageCommand],
          preview: "edit",
          className: `${
            bgClass ?? "!bg-anilist-white_firefly"
          } border-0 !shadow-none !ring-0`,
          textareaProps: {
            className: `${
              bgClass ?? "!bg-anilist-white_firefly"
            } focus:ring-0 focus:border-0 border-none !outline-none`,
          },
          visibleDragbar: true,
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
