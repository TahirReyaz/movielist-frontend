import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";

import Modal from "../../UI/Modal";
import { addEntry, getEntryDetails, getMediaDetail } from "../../../lib/api";
import TopSection from "./TopSection";
import Loading from "../Loading";
import Error from "../Error";
import TextInput from "../TextInput";
import { updateEntry } from "../../../lib/api";
import CustomLists from "./CustomLists";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { toggleFav } from "../../../lib/api";
import { useAppSelector } from "../../../hooks/redux";
import { useLoadingBar } from "../LoadingBar";
import { IEntry, TStatus } from "../../../constants/Interfaces/entry";
import { TMediaType } from "../../../constants/Interfaces/media";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id?: string;
  mediaid: string;
  mediaType: TMediaType;
}

type Option = {
  value: TStatus;
  label: string;
};

const Label = ({ label }: { label: string }) => {
  return <p className="text-xl text-left text-textLight my-2">{label}</p>;
};

const EntryEditorModal = ({ open, setOpen, id, mediaid, mediaType }: Props) => {
  const { profileData: profile, username } = useAppSelector(
    (state) => state.auth
  );
  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

  const {
    data: entry,
    isLoading,
    isError,
  } = useQuery<IEntry>({
    queryKey: ["entry", id],
    queryFn: () => getEntryDetails(id!),
    enabled: !!id && open,
  });

  const [status, setStatus] = useState<TStatus | undefined>(undefined);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [score, setScore] = useState<number | undefined>();
  const [rewatches, setRewatches] = useState<number>(0);
  const [progress, setProgress] = useState<number | undefined>(0);
  const [notes, setNotes] = useState<string | undefined>("");
  const [maxProgress, setMaxProgress] = useState(0);

  const {
    data: media,
    isLoading: isMediaLoading,
    isError: isMediaError,
  } = useQuery({
    queryKey: ["media", mediaType, mediaid, null],
    queryFn: () => getMediaDetail(mediaType, mediaid),
    enabled: !!mediaid && open,
  });

  const today = new Date().getUTCDate();

  const fav = profile?.fav[mediaType]?.includes(mediaid);

  let statusOptions: Option[] = [
    { value: "watching", label: "Watching" },
    { value: "planning", label: "Plan to watch" },
    { value: "completed", label: "Completed" },
    { value: "rewatching", label: "Rewatching" },
    { value: "paused", label: "Paused" },
    { value: "dropped", label: "Dropped" },
  ];

  // Remove options
  if (entry && entry.data) {
    if (entry.data.status?.length > 0) {
      if (entry.data.status !== "Released" || entry.data.status !== "Ended") {
        const removeOptions: TStatus[] = ["completed", "rewatching"];
        statusOptions.filter((opt) => !removeOptions.includes(opt.value));
      }
    }
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      if (status) {
        try {
          loadingBar.current?.continuousStart();
          await updateEntry({
            status,
            id,
            startDate,
            endDate: finishDate,
            progress,
            notes,
            rewatches,
            score,
          });
          loadingBar.current?.complete();
          showSuccessToast(
            `${mediaType == "tv" ? media.name : media.title} list entry updated`
          );
          queryClient.invalidateQueries({
            queryKey: ["entries", username, mediaType],
          });
          setOpen(false);
        } catch (error: any) {
          loadingBar.current?.complete();
          showErrorToast(error.message);
        }
      }
    } else {
      if (status) {
        try {
          loadingBar.current?.continuousStart();
          await addEntry({
            mediaid,
            mediaType,
            title: mediaType == "tv" ? media.name : media.title,
            poster: media.poster_path,
            backdrop: media.backdrop_path,
            status,
            startDate,
            endDate: finishDate,
            progress,
            notes,
            rewatches,
            score,
          });
          loadingBar.current?.complete();
          showSuccessToast(
            `${mediaType == "tv" ? media.name : media.title} list entry updated`
          );
          queryClient.invalidateQueries({
            queryKey: ["entry", id],
          });
          setOpen(false);
        } catch (error: any) {
          loadingBar.current?.complete();
          showErrorToast(error.message);
        }
      }
    }
  };

  const handleFavToggle = async (toFav: boolean) => {
    try {
      loadingBar.current?.continuousStart();
      await toggleFav(mediaid, mediaType, toFav);
      loadingBar.current?.complete();

      showSuccessToast(
        toFav ? "Added to Favourites" : "Removed from Favourites"
      );

      queryClient.invalidateQueries({
        queryKey: ["user", username],
      });
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    if (entry) {
      if (entry.status) setStatus(entry.status);
      if (entry.startDate) setStartDate(entry.startDate);
      if (entry.endDate) setFinishDate(entry.endDate);
      if (entry.score) setScore(entry.score);
      if (entry.rewatches) setRewatches(entry.rewatches);
      if (entry.progress) setProgress(entry.progress);
      if (entry.notes) setNotes(entry.notes);
      if (entry.data) {
        if (entry.mediaType == "movie") {
          setMaxProgress(1);
        } else {
          setMaxProgress(entry.data.number_of_episodes);
        }
      }
    }
  }, [entry]);

  useEffect(() => {
    if (media) {
      if (mediaType == "movie") {
        setMaxProgress(1);
      } else {
        setMaxProgress(media.number_of_episodes);
      }
    }
  }, [media]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSave}
        className="mx-0 w-screen md:w-[800px] bg-bgSecondary rounded-0 md:rounded-md"
      >
        {isLoading || isMediaLoading || isError || isMediaError ? (
          isError || isMediaError ? (
            <Error />
          ) : (
            <Loading />
          )
        ) : (
          <>
            <TopSection
              {...{
                title: media?.title,
                fav,
                backdrop: media?.backdrop_path,
                poster: media?.poster_path,
                onFav: () => handleFavToggle(true),
                onUnFav: () => handleFavToggle(false),
                onClose: () => setOpen(false),
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-20 pb-0">
                  {/* Status and start date */}
                  <div>
                    {/* Status */}
                    <div className="my-8">
                      <Label label="Status" />
                      <Select
                        {...{
                          value: {
                            value: status,
                            label: statusOptions.find(
                              (option) => option.value === status
                            )?.label,
                          },
                          options: statusOptions,
                          onChange: (opt: any) => setStatus(opt.value),
                          className:
                            "bg-anilist-bunker rounded-lg text-[1.4rem] text-left text-anilist-aqua_haze px-8 py-1",
                          classNames: {
                            menu: () =>
                              "mt-3 text-anilist-gray-gull bg-anilist-gray-athens_gray rounded-lg p-3",
                            option: (opt) =>
                              `${
                                entry &&
                                entry.status === opt.data.value &&
                                "text-anilist-blue-picton"
                              } p-3 text-[1.4rem] rounded-md cursor-pointer`,
                          },
                          unstyled: true,
                          placeholder: "Status",
                        }}
                      />
                    </div>
                    {/* Start date */}
                    <div className="my-8">
                      <Label label="Start Date" />
                      <TextInput
                        {...{
                          type: "date",
                          value: startDate,
                          onChange: (e) => setStartDate(e.target.value),
                          name: "start-date",
                          classes: "!bg-anilist-bunker text-anilist-aqua_haze",
                          max: today,
                        }}
                      />
                    </div>
                  </div>
                  {/* Score and finish date */}
                  <div>
                    {/* Score */}
                    <div className="my-8">
                      <Label label="Score" />
                      <TextInput
                        {...{
                          type: "number",
                          value: score ?? 0,
                          onChange: (e) => setScore(parseInt(e.target.value)),
                          name: "score",
                          classes: "!bg-anilist-bunker text-anilist-aqua_haze",
                          min: 0,
                          max: 10,
                        }}
                      />
                    </div>
                    {/* Finish date */}
                    <div className="my-8">
                      <Label label="Finish Date" />
                      <TextInput
                        {...{
                          type: "date",
                          value: finishDate,
                          onChange: (e) => setFinishDate(e.target.value),
                          name: "finish-date",
                          classes: "!bg-anilist-bunker text-anilist-aqua_haze",
                          max: today,
                        }}
                      />
                    </div>
                  </div>
                  {/* Progress and rewatches */}
                  <div>
                    {/* Progress */}
                    <div className="my-8">
                      <Label label="Episode Progress" />
                      <TextInput
                        {...{
                          type: "number",
                          value: progress ?? 0,
                          onChange: (e) =>
                            setProgress(parseInt(e.target.value)),
                          name: "score",
                          max: maxProgress,
                          classes: "!bg-anilist-bunker text-anilist-aqua_haze",
                          min: 0,
                        }}
                      />
                    </div>
                    {/* Rewatches */}
                    <div className="my-8">
                      <Label label="Total Rewatches" />
                      <TextInput
                        {...{
                          type: "number",
                          value: rewatches ?? 0,
                          onChange: (e) =>
                            setRewatches(parseInt(e.target.value)),
                          name: "score",
                          classes: "!bg-anilist-bunker text-anilist-aqua_haze",
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Notes */}
                <div className="p-20 pt-0">
                  <div className="col-span-3">
                    <Label label="Notes" />
                    <textarea
                      {...{
                        value: notes ?? "",
                        onChange: (e) => setNotes(e.target.value),
                        name: "notes",
                        className:
                          "bg-anilist-bunker text-anilist-aqua_haze text-2xl w-full rounded focus:outline-none p-4 min-h-16",
                      }}
                    />
                  </div>
                </div>
              </div>
              {id && <CustomLists {...{ id, setOpen }} />}
            </div>
          </>
        )}
      </form>
    </Modal>
  );
};

export default EntryEditorModal;
