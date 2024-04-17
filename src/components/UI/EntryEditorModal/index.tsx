import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";

import Modal from "../../UI/Modal";
import { getEntryDetail, getMediaDetail } from "../../../lib/api";
import TopSection from "./TopSection";
import Loading from "../Loading";
import Error from "../Error";

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

  if (isLoading || isMediaLoading) {
    return <Loading />;
  }
  if (isError || isMediaError) {
    return <Error />;
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="mx-48">
        <TopSection
          {...{
            title: entry ? entry.title : media.title,
            fav: entry ? entry.fav : false,
            backdrop: entry ? entry.backdrop : media.backdrop_path,
            poster: entry ? entry.poster : media.poster_path,
            onFav: () => {},
            onUnFav: () => {},
            onSave: () => {},
            onClose: () => setOpen(false),
          }}
        />
      </div>
    </Modal>
  );
};

export default EntryEditorModal;
