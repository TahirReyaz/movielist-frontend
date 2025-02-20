import axios from "axios";

import { backendUrl } from "../../constants";
import { sessionLogin, login, signup, changePassword } from "./auth";
import {
  getMediaActivities,
  getGlobalActivities,
  getProfileActivities,
  getActivityHistory,
  getFollowingActivities,
  getActivity,
  delActivity,
  likeActivity,
  unlikeActivity,
  createNewActivity,
} from "./activity";
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
  getMediaTags,
  getMediaMoreDetails,
  getMediaRelations,
  getGenreList,
  getSeasonDetails,
} from "./media";
import {
  delUserMediaEntries,
  addEntry,
  getEntryDetails,
  updateEntry,
  increaseProgess,
  deleteEntry,
  getUserMediaEntries,
  getUserEntryByMediaid,
  getWatchingUserMediaEntries,
} from "./entry";
import {
  commentOnActivity,
  getActivityComments,
  likeCommentToggle,
  deleteComment,
} from "./comment";
import { getStaffDetails, getStaffCredits, searchStaff } from "./staff";
import { getUserNotifsByType, markAllUserNotifsRead } from "./notification";

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
export {
  getMediaActivities,
  getGlobalActivities,
  getProfileActivities,
  getActivityHistory,
  getFollowingActivities,
  getActivity,
  delActivity,
  likeActivity,
  unlikeActivity,
  createNewActivity,
};
export {
  getMediaStatusDist,
  getMediaFollowingStatus,
  getMediaTrailers,
  getMediaVideos,
  getBulkMedia,
  getMediaDetail,
  getSearchResults,
  getSearchMultiResults,
  getMediaTags,
  getMediaMoreDetails,
  getMediaRelations,
  getGenreList,
  getSeasonDetails,
};
export {
  delUserMediaEntries,
  addEntry,
  getEntryDetails,
  updateEntry,
  increaseProgess,
  deleteEntry,
  getUserMediaEntries,
  getUserEntryByMediaid,
  getWatchingUserMediaEntries,
};
export {
  commentOnActivity,
  getActivityComments,
  likeCommentToggle,
  deleteComment,
};
export { getStaffDetails, getStaffCredits, searchStaff };
export { getUserNotifsByType, markAllUserNotifsRead };
