import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useAppSelector } from "../../../../../hooks/redux";
import { getActivityHistory } from "../../../../../lib/api/activity";
import Loading from "../../../../../components/UI/Loading";
import Tippy from "@tippyjs/react/headless";
import { activityHistoryColours } from "../../../../../constants";

const ActivityHistory = () => {
  const { username } = useAppSelector((state) => state.profile);

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery<{ date: string; count: number }[][]>({
    queryKey: ["activity", "history", username],
    queryFn: () => getActivityHistory(username),
    enabled: !!username,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !history || history.length === 0) {
    return;
  }

  return (
    <div className="mb-8 hidden md:block">
      <h3 className="font-semibold text-xl ps-4 mb-4">Activity History</h3>
      <div className="flex gap-2 bg-anilist-mirage rounded-lg p-8">
        {history.map((week, index) => (
          <div className="grid grid-rows-7 gap-2" key={index}>
            {week.map((item) =>
              item.count === 0 ? (
                <div className="size-4 bg-black/60 rounded" key={item.date} />
              ) : (
                <Tippy
                  {...{
                    render: (attrs) => (
                      <div
                        className="bg-anilist-mirage/70 p-4 rounded-lg"
                        {...attrs}
                      >
                        <h4 className="mb-8 text-2xl font-medium text-anilist-aqua_haze">
                          {item.date}
                        </h4>
                        <div className="text-xl text-anilist-blue_haze flex items-center">
                          <div
                            className="me-2 rounded-full size-4"
                            style={{
                              backgroundColor:
                                item.count < 4
                                  ? activityHistoryColours[item.count]
                                  : "#9FADBD",
                            }}
                          />
                          Amount: {item.count}
                        </div>
                      </div>
                    ),
                    trigger: "mouseenter focus",
                    interactive: false,
                    key: item.date,
                  }}
                >
                  <div
                    className="size-4 rounded"
                    style={{
                      backgroundColor:
                        item.count < 4
                          ? activityHistoryColours[item.count]
                          : "#9FADBD",
                    }}
                  />
                </Tippy>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityHistory;
