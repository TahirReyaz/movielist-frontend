import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";

import Modal from "../../UI/Modal";
import { getEntryDetail } from "../../../lib/api";

interface EntryEditorModalParams {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string | undefined;
}

const EntryEditorModal = ({ open, setOpen, id }: EntryEditorModalParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["entry", id],
    queryFn: () => getEntryDetail(id),
    enabled: !!id,
  });

  return (
    <Modal open={open} setOpen={setOpen}>
      <>
        {isLoading && <div className="text-3xl font-semibold">Loading...</div>}
        {isError && (
          <div className="text-3xl font-semibold">Error fetching data</div>
        )}
        {data && <div></div>}
      </>
    </Modal>
  );
};

export default EntryEditorModal;
