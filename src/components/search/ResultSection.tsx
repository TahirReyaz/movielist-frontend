import React, { Dispatch, SetStateAction } from "react";
import { mediaTypeType } from "../../constants/types";
import ResultItem from "./ResultItem";
import { Link } from "react-router-dom";

interface ResultSectionProps {
  type: mediaTypeType;
  title: string;
  list: any[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ResultSection = ({ type, title, list, setOpen }: ResultSectionProps) => {
  let titleField: string = "title",
    imgField: string = "poster_path",
    timeField = "realease_date";
  if (type == "tv") {
    titleField = "name";
    timeField = "first_air_date";
  } else if (type == "person") {
    titleField = "name";
    imgField = "profile_path";
  }
  return (
    <div className="w-5/12">
      <h3 className="text-white text-left">{title}</h3>
      <div className="bg-bgSecondary rounded overflow-hidden">
        {list &&
          list.length > 0 &&
          list.slice(0, 8).map((item: any) => (
            <ResultItem
              {...{
                title: item[titleField],
                type: type,
                poster: item[imgField],
                key: item.id,
                url: `/${type}/${item.id}`,
                time: item[timeField],
                setOpen,
              }}
            />
          ))}
        {list.length > 8 && (
          <Link
            to={"/"}
            className="flex py-3 px-4 hover:bg-actionPrimary justify-center text-sm text-textPrimary"
          >
            {`View all ${title.toLowerCase()} results`}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ResultSection;
