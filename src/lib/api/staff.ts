import apiClient from ".";

export async function getStaffDetails(id: string) {
  try {
    const response = await apiClient.get(`/staff/${id}`);
    const media = response.data;
    return media;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getStaffCredits(id: string | undefined) {
  try {
    const response = await apiClient.get(`/staff/${id}/credits`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const searchStaff = async (query: string) => {
  try {
    const response = await apiClient.get(`/search/staff`, {
      params: {
        query,
      },
    });

    return response.data?.results;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
