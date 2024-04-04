import React from "react";
import ComingSoon from "../../../../ComingSoon";
import { Link } from "react-router-dom";

const StatusDistribution = () => {
  return (
    <div>
      <h2 className="text-[1.4rem] font-semibold my-4">
        <Link to="/characters">StatusDistribution</Link>
      </h2>

      <ComingSoon />
    </div>
  );
};

export default StatusDistribution;
