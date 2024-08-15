import React from "react";

const Item = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="text-center">
      <h4 className="text-2xl font-medium mb-4">{value}</h4>
      <h3 className="text-xl font-normal">{title}</h3>
    </div>
  );
};

export default Item;
