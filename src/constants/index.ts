export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const statusColors: {
  completed?: string;
  watching?: string;
  dropped?: string;
  paused?: string;
  planning?: string;
  [key: string]: string | undefined;
} = {
  completed: "#64D22D",
  watching: "#00AAFF",
  dropped: "#EC294B",
  paused: "#F779A4",
  planning: "#E74C3C",
};

export const searchTypes = [
  { label: "Movie", to: "movie" },
  { label: "TV", to: "tv" },
  { label: "Staff", to: "staff" },
  { label: "Studios", to: "studio" },
  { label: "Users", to: "users" },
];
