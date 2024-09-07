export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const AUTH_COOKIE = import.meta.env.VITE_AUTH_COOKIE;
export const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

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

export const distributionColors = [
  "#7C899A",
  "#2C3E50",
  "#E74C3C",
  "#FF6736",
  "#F5579B",
  "#752A4B",
  "#F5579B",
  "#FF6736",
  "#E74C3C",
  "#2C3E50",
  "#7C899A",
  "#2C3E50",
  "#E74C3C",
  "#FF6736",
  "#F5579B",
  "#752A4B",
  "#F5579B",
  "#FF6736",
  "#E74C3C",
  "#2C3E50",
  "#7C899A",
];

export const genreColors = [
  "#64D22D",
  "#00AAFF",
  "#9256F3",
  "#F779A4",
  "#EC294B",
  "#E74C3C",
];

export const searchTypes = [
  { label: "Movie", to: "movie" },
  { label: "TV", to: "tv" },
  { label: "Staff", to: "staff" },
  { label: "Studios", to: "studios" },
  { label: "Users", to: "users" },
];
