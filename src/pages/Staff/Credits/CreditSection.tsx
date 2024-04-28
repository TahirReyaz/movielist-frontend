import React from "react";
import CreditCard from "./CreditCard";

interface CreditSectionProps {
  title: string;
  items: any[];
}

const CreditSection = ({ title, items }: CreditSectionProps) => {
  return (
    <div>
      <h3 className="text-4xl font-bold my-16">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
        {items.length > 0 &&
          items.map((item: any) => (
            <CreditCard {...{ key: item.title, ...item }} />
          ))}
      </div>
    </div>
  );
};

export default CreditSection;
