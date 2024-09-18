import React, { FormEvent, useState } from "react";

import TextInputWithClearButton from "../../../../components/UI/Inputs/TextInputWithClearButton";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../../utils/toastUtils";
import { changePassword } from "../../../../lib/api";
import WarningModalWithInput from "../../../../components/UI/WarningModal/WarningModalWithInput";
import { passwordValidity } from "../../../../lib/helpers";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const showButton = () => {
    let show = false;
    if (
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      newPassword === confirmPassword
    ) {
      show = true;
    }
    return show;
  };

  const loadingBar = useLoadingBar();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordValidity(newPassword)) {
      setShowModal(true);
    } else {
      const msg =
        "Password must have minimum length of 8 characters, contain a capital and a small letter, contain a number and a special character";
      showWarningToast(msg);
    }
  };

  const handleSave = async () => {
    try {
      loadingBar.current?.continuousStart();
      await changePassword(newPassword, oldPassword);
      loadingBar.current?.complete();

      setNewPassword("");
      setConfirmPassword("");

      showSuccessToast(`Password changed`);
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  return (
    <>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextInputWithClearButton
          {...{
            value: newPassword,
            setValue: setNewPassword,
            type: "password",
            placeholder: "New Password",
          }}
        />
        <TextInputWithClearButton
          {...{
            value: confirmPassword,
            setValue: setConfirmPassword,
            type: "password",
            placeholder: "Confirm New Password",
          }}
        />
        {showButton() && (
          <button
            type="submit"
            className="py-4 px-6 mt-4 text-xl bg-anilist-blue-picton cursor-pointer rounded-md text-anilist-aqua_haze w-fit"
          >
            Save Password
          </button>
        )}
      </form>
      <WarningModalWithInput
        {...{
          open: showModal,
          setOpen: setShowModal,
          action: () => handleSave(),
          actionName: "Submit",
          message:
            "Please enter your current password to confirm these changes",
          title: "Confirm Current Password",
          type: "password",
          value: oldPassword,
          onChange: (e) => setOldPassword(e.target.value),
        }}
      />
    </>
  );
};

export default ChangePassword;
