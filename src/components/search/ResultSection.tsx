import React from "react";
import { mediaTypeType } from "../../constants/types";
import ResultItem from "./ResultItem";

interface ResultSectionProps {
  type: mediaTypeType;
  title: string;
  list: any[];
}

const ResultSection = ({ type, title, list }: ResultSectionProps) => {
  let titleField: string = "title",
    imgField: string = "poster_path";
  if (type == "show") {
    titleField = "name";
  } else if (type == "person") {
    titleField = "name";
    imgField = "profile_path";
  }
  return (
    <div className="w-5/12">
      <h3 className="text-white text-left">{title}</h3>
      <div className="bg-bgSecondary rounded">
        {list &&
          list.length > 0 &&
          list.map((item: any) => (
            <ResultItem
              {...{
                title: item[titleField],
                type: type,
                poster: item[imgField],
                key: item.id,
                url: `/${type}/${item.id}`,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default ResultSection;
