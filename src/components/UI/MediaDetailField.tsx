import React from "react";

interface MediaDetailFieldProps {
  fieldName: string;
  value?: string | number;
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
    <div className="p-2">
      <p>{fieldName}</p>
      {value && <p>{value}</p>}
      {values &&
        valkey &&
        values.map((item: any, index: number) => (
          <p key={index}>{item[valkey]}</p>
        ))}
    </div>
  );
};

export default MediaDetailField;
