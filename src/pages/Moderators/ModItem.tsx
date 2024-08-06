import React from "react";
import { Link } from "react-router-dom";

const ModItem = ({ username }: { username: string }) => {
  return <Link to={`/user/${username}`}>{username}</Link>;
};

export default ModItem;
