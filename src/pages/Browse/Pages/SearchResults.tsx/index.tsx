import React from "react";

import Item from "./Item";
import { posterSizes, tmdbImgBaseUrl } from "../../../../constants/tmdb";
import placeholderImg from "../../../../assets/no_img_long.jpg";
import placeholderUserImg from "../../../../assets/userAvatar.png";

const SearchResults = ({ results, type }: { results: any[]; type: string }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-16">
      {results.map((result: any) => {
        let title = result.name,
          img = result.profile_path
            ? `${tmdbImgBaseUrl}/${posterSizes.lg}${result.profile_path}`
            : placeholderImg,
          id = result.id;

        if (type == "user") {
          title = result.username;
          img = result.avatar ? result.avatar : placeholderUserImg;
          id = result.username;
        }
        return (
          <Item
            {...{
              title,
              img,
              id,
              key: id,
              type,
            }}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
