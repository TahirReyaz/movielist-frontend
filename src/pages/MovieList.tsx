import { useParams } from "react-router-dom";

const MovieList = () => {
  const { username } = useParams();
  return <div className="pt-4 px-28">MovieList of {username}</div>;
};

export default MovieList;
