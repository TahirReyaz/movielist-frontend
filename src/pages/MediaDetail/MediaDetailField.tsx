import React from "react";
import { formatRuntime } from "../../lib/helpers";
import { MovieDetail, TvDetail } from "../../constants/types/media";

interface MediaDetailFieldProps {
  fieldName: keyof (MovieDetail & TvDetail);
  value?: string | number | string[];
  values?: any;
  valkey?: string;
  label?: string;
}

const MediaDetailField = ({
  fieldName,
  value,
  values,
  valkey,
  label,
}: MediaDetailFieldProps) => {
  let processedVal = value;
  if (fieldName === "runtime") {
    processedVal = formatRuntime(value);
  }
  return (
    <div className="p-2 md:min-w-0 min-w-fit-content">
      <div className="text-textPrimary text-[1.3rem] font-medium">{label}</div>
      {value && !valkey && (
        <div className="text-anilist-gray-regent text-[1.2rem]">
          {processedVal}
        </div>
      )}
      {values &&
        valkey &&
        values.map((item: any, index: number) => (
          <p
            className="hidden md:block text-xl text-anilist-gray-regent"
            key={index}
          >
            {item[valkey]}
          </p>
        ))}
      {values && valkey && (
        <div className="block md:hidden text-xl text-anilist-gray-regent">
          {values.map((item: any) => item[valkey]).join(", ")}
        </div>
      )}
    </div>
  );
};

export default MediaDetailField;
