import React from "react";
import { Link } from "react-router-dom";

import { StaffExternalLinks } from "../../constants/types/media";

type Props = {
  homepage?: string | null;
} & StaffExternalLinks;

const ExternalLinks = ({
  homepage,
  twitter_id,
  wikidata_id,
  facebook_id,
  youtube_id,
  imdb_id,
  instagram_id,
}: Props) => {
  const idArray = [];
  if (homepage) {
    idArray.push({ label: "Homepage", url: homepage });
  }
  if (facebook_id) {
    idArray.push({
      label: "Facebook",
      url: `https://facebook.com/${facebook_id}`,
    });
  }
  if (imdb_id) {
    idArray.push({ label: "Imdb", url: `https://imdb.com/name/${imdb_id}` });
  }
  if (wikidata_id) {
    idArray.push({
      label: "Wikidata",
      url: `https://wikidata.org/wiki/${wikidata_id}`,
    });
  }
  if (twitter_id) {
    idArray.push({ label: "Twitter/ X", url: `https://x.com/${twitter_id}` });
  }
  if (instagram_id) {
    idArray.push({
      label: "Instagram",
      url: `https://instagram.com/${instagram_id}`,
    });
  }

  if (idArray.length === 0) {
    return;
  }

  return (
    <div className="flex mb-8">
      {idArray.map((item, index) => (
        <span className="text-2xl" key={item.label}>
          <span
            className="me-2 text-anilist-blue-picton cursor-pointer"
            onClick={() => window.open(item.url, "_blank")}
          >
            {item.label}
          </span>
          {index < idArray.length - 1 && <span className="me-2">|</span>}
        </span>
      ))}
    </div>
  );
};

export default ExternalLinks;
