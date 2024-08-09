import React from "react";
import { Link } from "react-router-dom";

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
        <img src={img} alt={title} className="rounded" />
      </Link>
      <Link to={`/${type}/${id}`} className="block mt-4">
        <h3 className="text-xl font-medium">{title}</h3>
      </Link>
    </div>
  );
};

export default Item;
