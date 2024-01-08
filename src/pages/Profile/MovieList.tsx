import { useParams } from "react-router-dom";
import PageContainer from "../../components/UI/PageContainer";

const MovieList = () => {
  const { username } = useParams();
  return (
    <PageContainer>
      <span>Movie List of {username}</span>
    </PageContainer>
  );
};

export default MovieList;
