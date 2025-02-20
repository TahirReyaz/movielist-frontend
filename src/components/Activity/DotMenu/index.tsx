import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaLink } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useQueryClient } from "@tanstack/react-query";

import { useAppSelector } from "../../../hooks/redux";
import { useLoadingBar } from "../../UI/LoadingBar";
import { delActivity } from "../../../lib/api";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import WarningModal from "../../UI/WarningModal";

interface Props {
  id: string;
  username: string;
  location: string;
  queryKey: string[];
}

const DotMenu = ({
  id,
  username: activityUsername,
  location,
  queryKey,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { username } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      loadingBar.current?.continuousStart();
      await delActivity(id);

      loadingBar.current?.complete();
      showSuccessToast("Activity Deleted");
      setModalOpen(false);

      if (location === "page") {
        navigate("/");
      } else {
        queryClient.invalidateQueries({ queryKey });
      }
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  const options = [
    {
      label: "Direct Link",
      Icon: FaLink,
      action: () => navigate(`/activity/${id}`),
    },
  ];

  if (username === activityUsername) {
    options.push({
      label: "Delete",
      Icon: RxCross2,
      action: () => setModalOpen(true),
    });
  }

  return (
    <>
      <Tippy
        interactive={true}
        placement="bottom"
        trigger="click"
        arrow={false}
        render={(attrs) => (
          <ul className="bg-anilist-aqua_haze rounded py-2" {...attrs}>
            {options.map(({ label, Icon, action }) => (
              <li
                {...{
                  onClick: action,
                  className:
                    "cursor-pointer p-4 text-xl font-medium text-anilist-gray-gull flex gap-4 hover:bg-anilist-blue-picton hover:text-anilist-aqua_haze",
                  key: label,
                }}
              >
                <Icon /> {label}
              </li>
            ))}
          </ul>
        )}
      >
        <div>
          <HiDotsHorizontal
            {...{
              className:
                "cursor-pointer text-3xl hover:text-anilist-blue-picton",
            }}
          />
        </div>
      </Tippy>
      <WarningModal
        {...{
          action: handleDelete,
          open: modalOpen,
          setOpen: setModalOpen,
          message: "Are you sure you want to delete this activity?",
          actionName: "OK",
          title: "Warning",
        }}
      />
    </>
  );
};

export default DotMenu;
