import React from "react";

interface ContentGroupProps {
  title: string;
  children: JSX.Element;
}

const ContentGroup = ({ title, children }: ContentGroupProps) => {
  return (
    <div className="hidden md:block">
      <h2 className="text-[1.4rem] font-medium px-4 py-2 hover:text-actionPrimary cursor-pointer">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ContentGroup;
