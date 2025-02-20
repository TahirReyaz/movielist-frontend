import axios from "axios";

import { backendUrl } from "../../constants";
import { sessionLogin, login, signup, changePassword } from "./auth";
import { getMediaActivities } from "./activity";
import {
  followUser,
  unfollowUser,
  flagUserForDeletion,
  updateStats,
  changeUsername,
  getMods,
  getUserDetails,
  updateUserDetail,
  toggleFav,
  searchUsers,
} from "./user";
import {
  getMediaStatusDist,
  getMediaFollowingStatus,
  getMediaTrailers,
  getMediaVideos,
  getBulkMedia,
  getMediaDetail,
  getSearchResults,
  getSearchMultiResults,
} from "./media";
import { delUserMediaEntries, addEntry, getEntryDetails } from "./entry";

const apiClient = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default apiClient;

export { sessionLogin, login, signup, changePassword };
export {
  followUser,
  unfollowUser,
  flagUserForDeletion,
  updateStats,
  changeUsername,
  getMods,
  getUserDetails,
  updateUserDetail,
  toggleFav,
  searchUsers,
};
export { getMediaActivities };
export {
  getMediaStatusDist,
  getMediaFollowingStatus,
  getMediaTrailers,
  getMediaVideos,
  getBulkMedia,
  getMediaDetail,
  getSearchResults,
  getSearchMultiResults,
};
export { delUserMediaEntries, addEntry, getEntryDetails };
