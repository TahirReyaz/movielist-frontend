import React, { Dispatch, SetStateAction } from "react";
import Modal from "../Modal";

interface WarningModalParams {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  action: () => void;
}

const WarningModal = ({ open, setOpen, action }: WarningModalParams) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div onClick={action}>Are you sure?</div>
    </Modal>
  );
};

export default WarningModal;
