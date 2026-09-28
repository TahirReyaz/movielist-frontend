import React from "react";
import { Link } from "react-router-dom";

import { handleAvatarError } from "../../../../lib/avatar";

const Item = ({
  title,
  img,
  id,
  type,
}: {
  title: string;
  img: string;
  id: string;
  type: string;
}) => {
  return (
    <div>
      <Link to={`/${type}/${id}`}>
        <img
          src={img}
          alt={title}
          className="rounded"
          onError={type == "user" ? handleAvatarError : undefined}
        />
      </Link>
      <Link to={`/${type}/${id}`} className="block mt-4">
        <h3 className="text-xl font-medium">{title}</h3>
      </Link>
    </div>
  );
};

export default Item;
