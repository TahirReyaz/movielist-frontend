import React from "react";

import avatarPlaceholder from "../assets/avatar-placeholder.svg";

/**
 * Shown when a user has no avatar, or when their avatar URL fails to load
 * (deleted file, old Firebase link, offline CDN, ...).
 * Bundled with the app, so the fallback itself can never fail to load.
 */
export const AVATAR_FALLBACK: string = avatarPlaceholder;

/** `onError` for avatar <img> tags: swap in the placeholder once. */
export const handleAvatarError = (
  event: React.SyntheticEvent<HTMLImageElement>
) => {
  const img = event.currentTarget;
  if (img.dataset.fallback === "true") return; // avoid an error loop
  img.dataset.fallback = "true";
  img.src = AVATAR_FALLBACK;
};
