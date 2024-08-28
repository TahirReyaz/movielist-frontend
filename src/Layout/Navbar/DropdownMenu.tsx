import React from "react";

import { attrsType } from "./BrowseDropdownMenu";

interface DropdownMenuProps {
  mainContent: JSX.Element | JSX.Element[];
  footerContent: JSX.Element | JSX.Element[];
  attrs: attrsType;
}

const DropdownMenu = ({
  mainContent,
  footerContent,
  attrs,
}: DropdownMenuProps) => {
  return (
    <div className="rounded text-textLight shadow-md shadow-black" {...attrs}>
      <div className="bg-bgSecondary px-12 py-8">{mainContent}</div>
      <div className="bg-bgPrimary flex flex-wrap justify-between px-12 py-8 gap-1 cursor-pointer">
        {footerContent}
      </div>
    </div>
  );
};

export default DropdownMenu;
