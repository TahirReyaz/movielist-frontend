import React from "react";
import { useQuery } from "@tanstack/react-query";

import { NotifType } from "../../../constants/types";
import Loading from "../../../components/UI/Loading";
import Error from "../../../components/UI/Error";
import { Notification as NotificationType } from "../../../constants/types/activity";
import { getUserNotifsByType } from "../../../lib/api/notification";
import Notification from "./Notification";

interface Props {
  type: NotifType;
}

const List = ({ type }: Props) => {
  const {
    data: notifs,
    isLoading,
    isError,
  } = useQuery<NotificationType[]>({
    queryKey: ["notifications", type],
    queryFn: () => getUserNotifsByType(type),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  if (notifs && notifs.length === 0) {
    return <h3 className="text-2xl font-medium">No notifications found</h3>;
  }

  return (
    <div>
      {notifs &&
        notifs.map((notif: NotificationType) => (
          <Notification {...{ key: notif._id, ...notif }} />
        ))}
    </div>
  );
};

export default List;
