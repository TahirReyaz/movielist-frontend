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
      <div className="text-textPrimary">{fieldName}</div>
      {value && <div className="text-textSecondary">{value}</div>}
      {values &&
        valkey &&
        values.map((item: any, index: number) => (
          <p key={index}>{item[valkey]}</p>
        ))}
    </div>
  );
};

export default MediaDetailField;
