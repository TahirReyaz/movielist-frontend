import React from "react";
import FavItem from "./FavItem";
import { Link, useLocation } from "react-router-dom";

interface FavSectionProps {
  title: string;
  type: string;
  list: [string];
  location?: string;
}
const FavSection = ({
  title,
  type,
  list,
  location = "overview",
}: FavSectionProps) => {
  const { pathname } = useLocation();

  return (
    <div className="my-12">
      {location === "overview" ? (
        <Link to={`${pathname}/favorites`}>
          <h2 className="text-xl font-semibold ms-4 mb-4">{title}</h2>
        </Link>
      ) : (
        <h2 className="text-xl font-semibold ms-4 mb-4">{title}</h2>
      )}
      <ul
        className={`bg-bgSecondary rounded p-4 grid ${
          location == "overview" ? "grid-cols-4" : "grid-cols-3 md:grid-cols-9"
        } gap-4`}
      >
        {list.map((item) => (
          <FavItem {...{ id: Number(item), type, key: item }} />
        ))}
      </ul>
    </div>
  );
};

export default FavSection;
