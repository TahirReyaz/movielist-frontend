import MediaSection, { mediaSectionItem } from "../components/MediaSection";
import Landing from "../components/home/Landing";

const Home = () => {
  const mediaSections: mediaSectionItem[] = [
    { type: "upcoming", mediaType: "movie", title: "UPCOMING MOVIES" },
    { type: "now_playing", mediaType: "movie", title: "NOW PLAYING MOVIES" },
    { type: "popular", mediaType: "movie", title: "POPULAR MOVIES" },
    { type: "top_rated", mediaType: "movie", title: "TOP RATED MOVIES" },
  ];
  return (
    <div className="pt-4 px-28">
      <Landing />
      {mediaSections.map((item) => (
        <MediaSection {...{ ...item, key: item.title }} />
      ))}
    </div>
  );
};

export default Home;
