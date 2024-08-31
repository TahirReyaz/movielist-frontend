import React from "react";
import { useQuery } from "@tanstack/react-query";

import { NotifType } from "../../../constants/types";
import Loading from "../../../components/UI/Loading";
import Error from "../../../components/UI/Error";
import { Notification } from "../../../constants/types/activity";
import { getUserNotifsByType } from "../../../lib/api/notification";

interface Props {
  type: NotifType;
}

const List = ({ type }: Props) => {
  const {
    data: notifs,
    isLoading,
    isError,
  } = useQuery<Notification[]>({
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
      {notifs && notifs.map((notif: Notification) => <p>{notif.content}</p>)}
    </div>
  );
};

export default List;
