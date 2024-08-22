import React from "react";
import ComingSoon from "../../../../ComingSoon";
import { Link } from "react-router-dom";

const Staff = () => {
  return (
    <div>
      <h2 className="text-[1.4rem] font-medium my-4">
        <Link to="/characters">Staff</Link>
      </h2>

      <ComingSoon />
    </div>
  );
};

export default Staff;
