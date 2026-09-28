import apiClient from ".";

export type TImageKind = "avatar" | "banner";

type TSignatureResponse = {
  uploadUrl: string;
  apiKey: string;
  params: Record<string, string | number | boolean>;
  signature: string;
};

/** Cloudinary's free plan rejects images over 10 MB anyway. */
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];

/**
 * Upload a user image to Cloudinary and return its public URL.
 *  1. our backend signs the upload (the API secret stays on the server)
 *  2. the browser sends the file straight to Cloudinary
 * Re-uploading replaces the previous avatar/banner of this user.
 */
export const uploadImage = async (
  file: File,
  kind: TImageKind
): Promise<string> => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Please choose a PNG, JPG, WEBP or GIF image");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be smaller than 10 MB");
  }

  let signed: TSignatureResponse;
  try {
    const response = await apiClient.post<TSignatureResponse>(
      "/upload/signature",
      { kind }
    );
    signed = response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ?? "Could not start the upload"
    );
  }

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", signed.apiKey);
  form.append("signature", signed.signature);
  Object.entries(signed.params).forEach(([key, value]) =>
    form.append(key, String(value))
  );

  // plain fetch: this request goes to Cloudinary, not our backend
  const response = await fetch(signed.uploadUrl, {
    method: "POST",
    body: form,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message ?? "Image upload failed");
  }
  return data.secure_url as string;
};
