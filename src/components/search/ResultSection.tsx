import React, { Dispatch, SetStateAction } from "react";
import { multiSearchResultType } from "../../constants/types";
import ResultItem from "./ResultItem";
import { Link } from "react-router-dom";

interface ResultSectionProps {
  type: multiSearchResultType;
  title: string;
  list?: any[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  query?: string;
}

const ResultSection = ({
  type,
  title,
  list,
  setOpen,
  query,
}: ResultSectionProps) => {
  let titleField: string = "title",
    imgField: string = "poster_path",
    timeField = "release_date",
    idField = "id";
  if (type == "tv") {
    titleField = "name";
    timeField = "first_air_date";
  } else if (type == "person") {
    titleField = "name";
    imgField = "profile_path";
  } else if (type == "user") {
    titleField = "username";
    imgField = "avatar";
    idField = "username";
  }

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!event.ctrlKey && !event.metaKey) {
      setOpen(false);
    }
  };

  return (
    <div className="w-[48.5%]">
      <h3 className="my-4 text-white text-left font-semibold text-[1.4rem]">
        {title}
      </h3>
      <div className="bg-bgSecondary rounded overflow-hidden">
        {list &&
          list.length > 0 &&
          list.slice(0, 8).map((item: any) => (
            <ResultItem
              {...{
                title: item[titleField],
                poster: item[imgField],
                key: item[idField],
                url: `/${type}/${item[idField]}`,
                time: item[timeField],
                type,
                setOpen,
              }}
            />
          ))}
        {list && list.length > 8 && query && (
          <Link
            onClick={handleClick}
            to={`/search/tv?search=${query}`}
            className="flex py-3 px-4 hover:bg-actionPrimary justify-center text-xl text-textPrimary font-semibold"
          >
            {`View all ${title.toLowerCase()} results`}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ResultSection;
