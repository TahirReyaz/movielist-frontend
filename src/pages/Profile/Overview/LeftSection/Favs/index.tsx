import React from "react";
import FavSection from "./FavSection";

interface FavsProps {
  fav: any;
}

const Favs = ({ fav }: FavsProps) => {
  return (
    <div>
      {fav?.movie && fav.movie.length > 0 && (
        <FavSection {...{ title: "Movie", type: "movie", list: fav.movie }} />
      )}
      {fav?.tv && fav.tv.length > 0 && (
        <FavSection {...{ title: "Shows", type: "tv", list: fav.tv }} />
      )}
      {fav?.staff && fav.staff.length > 0 && (
        <FavSection {...{ title: "Staff", type: "staff", list: fav.staff }} />
      )}
    </div>
  );
};

export default Favs;
