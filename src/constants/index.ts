export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const statusColors: {
  completed?: string;
  watching?: string;
  dropped?: string;
  paused?: string;
  planning?: string;
  [key: string]: string | undefined;
} = {
  completed: "atlantis",
  watching: "azure_radiance",
  dropped: "amaranth",
  paused: "tickle_me_pink",
  planning: "cinnabar",
};
