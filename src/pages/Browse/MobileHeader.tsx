import React from "react";
import { useParams } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { FaAngleDown } from "react-icons/fa6";

import { searchTypes } from "../../constants";
import { Link } from "react-router-dom";

const MobileHeader = () => {
  const { mediaType } = useParams();
  const title = searchTypes.find((type: any) => type.to == mediaType)?.label;

  return (
    <Tippy
      interactive={true}
      placement="bottom-end"
      arrow
      render={(attrs) => (
        <div
          {...attrs}
          className="bg-anilist-mirage p-8 text-3xl font-medium rounded-md grid grid-rows-5 gap-8"
        >
          {searchTypes.map((type: any) => (
            <Link to={`/search/${type.to}`} className="w-[35vw]">
              {type.label}
            </Link>
          ))}
        </div>
      )}
    >
      <div className="md:hidden flex items-center mb-12">
        <h1 className=" text-5xl font-bold">Browse</h1>
        <div className="bg-anilist-mirage p-4 rouded-md ms-4 flex items-center font-medium">
          <span className="text-5xl font-bold me-4">{title}</span>
          <FaAngleDown className="text-4xl text-anilist-gray-bermuda/80" />
        </div>
      </div>
    </Tippy>
  );
};

export default MobileHeader;
