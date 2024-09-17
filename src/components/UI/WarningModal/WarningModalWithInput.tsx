import React, {
  ChangeEvent,
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
} from "react";
import Modal from "../Modal";
import { RxCross1 } from "react-icons/rx";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  action: () => void;
  message: string;
  title: string;
  actionName: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WarningModalWithInput = ({
  open,
  setOpen,
  action,
  message,
  title,
  actionName,
  placeholder,
  type,
  value,
  onChange,
}: Props) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          action();
        }}
        className="bg-anilist-ebony_clay text-anilist-gray-gull w-screen md:w-[400px] p-8 align-center"
      >
        <div className="flex justify-between">
          <h2 className="text-3xl">{title}</h2>
          <RxCross1
            className="hover:text-anilist-azure_radiance cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <p className="text-2xl my-8 text-start">{message}</p>
        <input
          {...{
            placeholder,
            className:
              "bg-anilist-bunker rounded text-anilist-aqua_haze/80 w-full text-2xl p-4 focus:outline-none mb-12",
            type,
            value,
            onChange,
            required: true,
          }}
        />
        <div className="flex justify-end gap-4">
          <div
            className="px-6 py-3 bg-black/40 text-anilist-gray-athens_gray/80 text-xl w-fit roundedtext-xl cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </div>
          <button
            className="px-6 py-3 bg-anilist-blue-picton text-anilist-gray-athens_gray w-fit rounded text-xl cursor-pointer"
            type="submit"
          >
            {actionName}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default WarningModalWithInput;
