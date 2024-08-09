import React from "react";
import Item from "./Item";

const SearchResults = ({ results }: { results: any[] }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-16">
      {results.map((result: any) => (
        <Item
          {...{
            title: result.name,
            img: result.profile_path,
            id: result.id,
            key: result.id,
          }}
        />
      ))}
    </div>
  );
};

export default SearchResults;
