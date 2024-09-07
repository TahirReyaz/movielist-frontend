import axios, { AxiosResponse } from "axios";
import { backendUrl } from "../../constants";

export async function getStaffDetails(id: number) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/staff/${id}`
    );
    const media = response.data;
    return media;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getStaffCredits(id: string | undefined) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/staff/${id}/credits`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const searchStaff = async (query: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/search/staff`,
      {
        params: {
          query,
        },
      }
    );

    return response.data?.results;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
