import MediaSection, { mediaSectionItem } from "../components/MediaSection";

const Home = () => {
  const mediaSections: mediaSectionItem[] = [
    { type: "upcoming", mediaType: "movie", title: "UPCOMING MOVIES" },
    { type: "now_playing", mediaType: "movie", title: "NOW PLAYING MOVIES" },
    { type: "popular", mediaType: "movie", title: "POPULAR MOVIES" },
    { type: "top_rated", mediaType: "movie", title: "TOP RATED MOVIES" },
  ];
  return (
    <div className="pt-4 px-28">
      {mediaSections.map((item) => (
        <MediaSection {...item} />
      ))}
    </div>
  );
};

export default Home;
