import React, { Dispatch, SetStateAction } from "react";
import Modal from "../Modal";
import { RxCross1 } from "react-icons/rx";

interface WarningModalParams {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  action: () => void;
  message: string;
  title: string;
  actionName: string;
}

const WarningModal = ({
  open,
  setOpen,
  action,
  message,
  title,
  actionName,
}: WarningModalParams) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-anilist-ebony_clay text-anilist-gray-gull w-screen md:w-[400px] p-8 align-center">
        <div className="flex justify-between">
          <h2 className="text-3xl">{title}</h2>
          <RxCross1
            className="hover:text-anilist-azure_radiance cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <p className="text-2xl my-8 text-start">{message}</p>
        <div className="flex justify-end gap-4">
          <div
            className="px-6 py-3 bg-black/40 text-anilist-gray-athens_gray w-fit roundedtext-xl cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </div>
          <div
            className="px-6 py-3 bg-anilist-blue-picton text-anilist-gray-athens_gray w-fit rounded text-xl cursor-pointer"
            onClick={action}
          >
            {actionName}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
