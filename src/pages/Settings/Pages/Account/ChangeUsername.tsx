import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { changeUsername } from "../../../../lib/api";
import { changeUsernameAction } from "../../../../store/AuthSlice";

const ChangeUsername = () => {
  const [newUsername, setNewUsername] = useState<string>("");
  const { username } = useAppSelector((state) => state.auth);

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loadingBar.current?.continuousStart();
      await changeUsername(newUsername);
      loadingBar.current?.complete();

      queryClient.invalidateQueries({ queryKey: ["user", username] });
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
      queryClient.invalidateQueries({ queryKey: ["user", newUsername] });
      queryClient.invalidateQueries({ queryKey: ["profile", newUsername] });
      dispatch(changeUsernameAction(newUsername));
      showSuccessToast(`Username changed to ${newUsername}`);
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  const validateUsername = (input: string) => {
    let valid = false;
    if (input.length > 0 && input !== username && !input.includes(" ")) {
      valid = true;
    }
    return valid;
  };

  useEffect(() => {
    if (username) {
      setNewUsername(username);
    }
  }, [username]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        {...{
          className:
            "bg-anilist-white_firefly/80 rounded-md text-anilist-aqua_haze/80 w-full text-2xl p-4 focus:outline-none mb-4",
          type: "text",
          value: newUsername,
          onChange: (e) => setNewUsername(e.target.value),
          required: true,
        }}
      />
      <Link
        to={"/settings/name-clear"}
        className="text-xl text-anilist-gray-regent hover:text-anilist-blue-picton"
      >
        User name you want is taken by an inactive user? Try claiming it
      </Link>
      <br />
      {validateUsername(newUsername) && (
        <button
          type="submit"
          className="py-4 px-6 mt-4 text-xl bg-anilist-blue-picton cursor-pointer rounded-md text-anilist-aqua_haze"
        >
          Save Username
        </button>
      )}
    </form>
  );
};

export default ChangeUsername;
