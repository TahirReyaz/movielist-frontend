import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import logo from "../../assets/logo-bg.png";

import { frontendUrl } from "../../constants";

interface Props {
  title: string;
  description?: string;
}

const MetaTags = ({ title, description }: Props) => {
  const { pathname } = useLocation();

  return (
    <Helmet>
      <title>{`${title}`}</title>
      {description && (
        <meta name="description" content={description.slice(0, 150)} />
      )}
      <link rel="canonical" href={`${frontendUrl}${pathname}`} />
      <meta property="og:image" content={`${frontendUrl}${logo}`} />
      <meta property="og:title" content={`${title}`} />
      <meta property="og:url" content={`${frontendUrl}${pathname}`} />
      <meta
        property="og:description"
        content={description ? description.slice(0, 150) : "MovieList"}
      />
    </Helmet>
  );
};

export default MetaTags;
