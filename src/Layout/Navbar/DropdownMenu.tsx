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
      <div className="bg-bgSecondary px-12 py-8 grid gap-8">{mainContent}</div>
      <div className="bg-bgPrimary grid grid-cols-2 px-12 py-4 gap-8 cursor-pointer">
        {footerContent}
      </div>
    </div>
  );
};

export default DropdownMenu;
