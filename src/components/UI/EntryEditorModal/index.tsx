import React, { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import Modal from "../../UI/Modal";
import { getEntryDetail, getMediaDetail } from "../../../lib/api";
import TopSection from "./TopSection";
import Loading from "../Loading";
import Error from "../Error";
import TextInput from "../TextInput";

interface EntryEditorModalParams {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id?: string;
  mediaid: string;
  mediaType: string;
}

const EntryEditorModal = ({
  open,
  setOpen,
  id,
  mediaid,
  mediaType,
}: EntryEditorModalParams) => {
  const [status, setStatus] = useState();
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [score, setScore] = useState("");
  const [rewatches, setRewatches] = useState("");
  const [progress, setProgress] = useState("");
  const [notes, setNotes] = useState("");

  const {
    data: entry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["entry", id],
    queryFn: () => getEntryDetail(id),
    enabled: !!id,
  });

  const {
    data: media,
    isLoading: isMediaLoading,
    isError: isMediaError,
  } = useQuery({
    queryKey: ["media", mediaType, mediaid],
    queryFn: () => getMediaDetail(mediaType, mediaid),
    enabled: !id && !!mediaid,
  });

  const listTypeOptions = [
    { value: "watching", label: "Watching" },
    { value: "planning", label: "Plan to watch" },
    { value: "completed", label: "Completed" },
    { value: "rewatching", label: "Rewatching" },
    { value: "paused", label: "Paused" },
    { value: "dropped", label: "Dropped" },
  ];

  const handleSave = () => {
    if (id) {
    } else {
    }
  };

  if (isLoading || isMediaLoading) {
    return <Loading />;
  }
  if (isError || isMediaError) {
    return <Error />;
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="mx-48 bg-bgSecondary rounded">
        <TopSection
          {...{
            title: entry ? entry.title : media.title,
            fav: entry ? entry.fav : false,
            backdrop: entry ? entry.backdrop : media.backdrop_path,
            poster: entry ? entry.poster : media.poster_path,
            onFav: () => {},
            onUnFav: () => {},
            onSave: handleSave,
            onClose: () => setOpen(false),
          }}
        />
        <div className="grid grid-cols-4 gap-8 p-20 pb-0">
          <div>
            <div className="my-8">
              <p className="text-xl text-left text-textLight my-2">Status</p>
              <Select
                {...{
                  options: listTypeOptions,
                  onChange: (val: any) => setStatus(val),
                  className:
                    "bg-bgFooter rounded-lg text-[1.4rem] text-left text-white px-8 py-1",
                  classNames: {
                    menu: () => "mt-3 bg-bgSecondary rounded-lg p-3",
                    option: () =>
                      "hover:bg-bgPrimary hover:text-actionPrimary p-3 text-[1.4rem] font-semibold rounded-md",
                  },
                  unstyled: true,
                  placeholder: "Status",
                }}
              />
            </div>
            <div className="my-8">
              <p className="text-xl text-left text-textLight my-2">
                Start Date
              </p>
              <TextInput
                {...{
                  type: "date",
                  value: startDate,
                  onChange: (e) => setStartDate(e.target.value),
                  name: "start-date",
                  classes: "!bg-bgFooter text-white",
                }}
              />
            </div>
          </div>
          <div>
            <div className="my-8">
              <p className="text-xl text-left text-textLight my-2">Score</p>
              <TextInput
                {...{
                  type: "number",
                  value: score,
                  onChange: (e) => setScore(e.target.value),
                  name: "score",
                  classes: "!bg-bgFooter text-white",
                  min: 0,
                  max: 10,
                }}
              />
            </div>
            <div className="my-8">
              <p className="text-xl text-left text-textLight my-2">
                Finish Date
              </p>
              <TextInput
                {...{
                  type: "date",
                  value: finishDate,
                  onChange: (e) => setFinishDate(e.target.value),
                  name: "finish-date",
                  classes: "!bg-bgFooter text-white",
                }}
              />
            </div>
          </div>
          <div>
            <div className="my-8">
              <p className="text-xl text-left text-textLight my-2">
                Episode Progress
              </p>
              <TextInput
                {...{
                  type: "number",
                  value: progress,
                  onChange: (e) => setProgress(e.target.value),
                  name: "score",
                  classes: "!bg-bgFooter text-white",
                  min: 0,
                }}
              />
            </div>
            <div className="my-8">
              <p className="text-xl text-left text-textLight my-2">
                Total Rewatches
              </p>
              <TextInput
                {...{
                  type: "number",
                  value: rewatches,
                  onChange: (e) => setRewatches(e.target.value),
                  name: "score",
                  classes: "!bg-bgFooter text-white",
                }}
              />
            </div>
          </div>
          <div>
            <p>Custom Lists</p>
          </div>
        </div>
        <div className="grid grid-cols-4 p-20 pt-0">
          <div className="col-span-3">
            <p className="text-xl text-left text-textLight my-2">Notes</p>
            <TextInput
              {...{
                type: "text",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                name: "notes",
                classes: "!bg-bgFooter text-white",
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EntryEditorModal;
