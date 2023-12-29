import MediaSection, { mediaSectionItem } from "../components/MediaSection";

const Home = () => {
  const mediaSections: mediaSectionItem[] = [
    { type: "upcoming", media: "movie", title: "UPCOMING MOVIES" },
    { type: "nowPlaying", media: "movie", title: "NOW PLAYING MOVIES" },
    { type: "popular", media: "movie", title: "POPULAR MOVIES" },
    { type: "topRated", media: "movie", title: "TOP RATED MOVIES" },
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
