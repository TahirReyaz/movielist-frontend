import React from "react";
import Tippy from "@tippyjs/react/headless";

import "tippy.js/animations/shift-away.css";

import BrowseDropdownMenu from "./BrowseDropdownMenu";
import NavItem from "./NavItem";

const SearchLink = ({ title }: { title: string }) => {
  return (
    <Tippy
      interactive={true}
      placement="bottom"
      arrow
      //   animation="shift-away"
      render={(attrs) => <BrowseDropdownMenu {...{ attrs }} />}
    >
      <div>
        <NavItem
          {...{
            path: `/search`,
            text: title,
          }}
        />
      </div>
    </Tippy>
  );
};

export default SearchLink;
