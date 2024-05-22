import React from "react";

interface MediaDetailFieldProps {
  fieldName: string;
  value?: string | number | string[];
  values?: any;
  valkey?: string;
}

const MediaDetailField = ({
  fieldName,
  value,
  values,
  valkey,
}: MediaDetailFieldProps) => {
  return (
    <div className="p-2 md:min-w-0 min-w-fit-content">
      <div className="text-textPrimary text-[1.3rem] font-medium">
        {fieldName}
      </div>
      {value && <div className="text-textLight text-[1.2rem]">{value}</div>}
      {values &&
        valkey &&
        values.map((item: any, index: number) => (
          <p key={index}>{item[valkey]}</p>
        ))}
    </div>
  );
};

export default MediaDetailField;
