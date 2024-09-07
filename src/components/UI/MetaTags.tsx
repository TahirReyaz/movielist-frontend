import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

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
    </Helmet>
  );
};

export default MetaTags;
