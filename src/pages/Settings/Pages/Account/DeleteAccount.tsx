import React, { useState } from "react";
import WarningModalWithInput from "../../../../components/UI/WarningModal/WarningModalWithInput";

const DeleteAccount = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleDelete = async () => {
    setShowModal(false);
  };

  return (
    <div className="mb-20">
      <hr className="text-anilist-gray-regent/50 mb-12" />
      <h3 className="text-2xl text-anilist-mandy font-medium mb-2">
        Delete User Account
      </h3>
      <p className="text-2xl text-anilist-gray-regent mb-4">
        Warning! This will permanently delete all your account data.
      </p>
      <p className="text-2xl text-anilist-gray-regent">
        To protect your account you will need to wait 24 hours after your
        initial account deletion request. Once 24 hours have passed please click
        the button below again to verify and complete your account deletion.
      </p>
      <div
        className="rounded-md text-xl text-anilist-aqua_haze bg-anilist-mandy/80 my-8 p-4 px-6 w-fit cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Delete User Account
      </div>

      <WarningModalWithInput
        {...{
          open: showModal,
          setOpen: setShowModal,
          title: "Delete User Account",
          message:
            "Please enter your password to confirm your account deletion",
          action: handleDelete,
          actionName: "OK, Delete my account",
          type: "password",
          placeholder: "Confirm Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
        }}
      />
    </div>
  );
};

export default DeleteAccount;
