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
