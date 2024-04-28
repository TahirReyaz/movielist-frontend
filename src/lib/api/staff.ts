import axios, { AxiosResponse } from "axios";
import { backendUrl } from "../../constants";

export async function getStaffDetails(id: string | undefined) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/staff/${id}`
    );
    const media = response.data;
    return { ...media, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export async function getStaffCredits(id: string | undefined) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/staff/${id}/credits`
    );
    const media = response.data;
    return { ...media, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}
