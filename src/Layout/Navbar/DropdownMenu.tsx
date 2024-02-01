import React from "react";

interface DropdownMenuProps {
  mainContent: JSX.Element | JSX.Element[];
  footerContent: JSX.Element | JSX.Element[];
}

const DropdownMenu = ({ mainContent, footerContent }: DropdownMenuProps) => {
  return (
    <div className="rounded text-textLight">
      <div className="bg-bgSecondary px-4 py-2">{mainContent}</div>
      <div className="bg-bgPrimary flex flex-wrap justify-between px-4 py-2 gap-1 cursor-pointer">
        {footerContent}
      </div>
    </div>
  );
};

export default DropdownMenu;
