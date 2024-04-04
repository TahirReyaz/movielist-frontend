import React from "react";
import ComingSoon from "../../../../ComingSoon";
import { Link } from "react-router-dom";

const Trailer = () => {
  return (
    <div>
      <h2 className="text-[1.4rem] font-semibold my-4">
        <Link to="/characters">Trailer</Link>
      </h2>

      <ComingSoon />
    </div>
  );
};

export default Trailer;
