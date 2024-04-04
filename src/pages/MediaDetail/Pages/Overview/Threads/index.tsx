import React from "react";
import ComingSoon from "../../../../ComingSoon";
import { Link } from "react-router-dom";

const Threads = () => {
  return (
    <div>
      <h2 className="text-[1.4rem] font-semibold my-4">
        <Link to="/characters">Threads</Link>
      </h2>

      <ComingSoon />
    </div>
  );
};

export default Threads;
