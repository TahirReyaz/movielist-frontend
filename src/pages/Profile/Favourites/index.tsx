import React from "react";

import { useAppSelector } from "../../../hooks/redux";
import FavSection from "../Overview/LeftSection/Favs/FavSection";

const Favourites = () => {
  const favData = useAppSelector((state) => state.profile.fav);

  return (
    <div className="pt-12 px-8 md:px-60">
      {favData?.movie?.length > 0 && (
        <FavSection
          {...{
            location: "favourites",
            title: "Movie",
            list: favData.movie,
            type: "movie",
          }}
        />
      )}
      {favData?.tv?.length > 0 && (
        <FavSection
          {...{
            location: "favourites",
            title: "Shows",
            list: favData.tv,
            type: "tv",
          }}
        />
      )}
      {favData?.characters?.length > 0 && (
        <FavSection
          {...{
            location: "favourites",
            title: "Characters",
            list: favData.characters,
            type: "character",
          }}
        />
      )}
      {favData?.staff?.length > 0 && (
        <FavSection
          {...{
            location: "favourites",
            title: "Staff",
            list: favData.staff,
            type: "staff",
          }}
        />
      )}
      {favData?.prod_companies?.length > 0 && (
        <FavSection
          {...{
            location: "favourites",
            title: "Production Companies",
            list: favData.prod_companies,
            type: "prod_companies",
          }}
        />
      )}
    </div>
  );
};

export default Favourites;
