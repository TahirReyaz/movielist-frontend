import React from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../../components/UI/Loading";
import Error from "../../../components/UI/Error";
import { getUserNotifsByType } from "../../../lib/api";
import Notification from "./Notification";
import {
  INotification,
  TNotifType,
} from "../../../constants/Interfaces/notifications";

interface Props {
  type: TNotifType;
}

const List = ({ type }: Props) => {
  const {
    data: notifs,
    isLoading,
    isError,
  } = useQuery<INotification[]>({
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
        notifs.map((notif: INotification) => (
          <Notification
            {...{
              key: notif._id,
              ...notif,
              pointingId: notif.pointingUser
                ? notif.pointingUser.username
                : notif.pointingId,
              pointingImg: notif.pointingUser
                ? notif.pointingUser.avatar
                : notif.pointingImg,
            }}
          />
        ))}
    </div>
  );
};

export default List;
