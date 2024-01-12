import React, { useEffect, useRef, useState, MouseEvent } from "react";

import TextInput from "../UI/TextInput";
import { getSearchResults } from "../../lib/api";
import SearchResults from "./SearchResults";

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

interface SearchModalParams {
  closeModal: () => void;
  showModal: boolean;
}

const SearchModal = ({ closeModal, showModal }: SearchModalParams) => {
  const [query, setQuery] = useState<string>("");
  const modalRef = useRef<HTMLDialogElement>(null);

  console.log({ query });

  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      modalRef.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);

  useEffect(() => {
    if (query.length > 0) {
      try {
        const fetchResults = async () => {
          const response = await getSearchResults(query);
          console.log({ response });
        };

        fetchResults();
      } catch (error) {
        console.error(error);
      }
    }
  }, [query]);

  return (
    <div className="">
      <dialog
        ref={modalRef}
        onCancel={closeModal}
        onClick={(e) =>
          modalRef.current &&
          !isClickInsideRectangle(e, modalRef.current) &&
          closeModal()
        }
      >
        <TextInput
          {...{
            label: "Search MovieList",
            type: "test",
            name: "search",
            value: query,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value),
          }}
        />
        <SearchResults />
      </dialog>
    </div>
  );
};

export default SearchModal;
