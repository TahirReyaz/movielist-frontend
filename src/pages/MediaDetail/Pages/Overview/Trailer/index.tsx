import React from "react";
import ComingSoon from "../../../../ComingSoon";
import { Link } from "react-router-dom";
import { mediaTypeType } from "../../../../../constants/types";

interface Props {
  mediaid: string;
  mediaType: mediaTypeType;
}

const Trailer = ({ mediaid, mediaType }: Props) => {
  return (
    <div className="mt-16">
      <h2 className="text-[1.4rem] font-medium my-4">
        <Link to={`/${mediaType}/${mediaid}/watch`}>Trailer</Link>
      </h2>

      <ComingSoon />
    </div>
  );
};

export default Trailer;
