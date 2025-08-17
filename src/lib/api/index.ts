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
  flagUserForDeletion,
  changeUsername,
  getMods,
  getUserDetails,
  updateUserDetail,
  toggleFav,
  searchUsers,
} from "./user";
import { followUser, unfollowUser } from "./follower";
import { updateStats, getOtherStats, getOverviewStats } from "./stat";
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
// User
export {
  flagUserForDeletion,
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
// Media
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
// Entry
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
// Stats
export { updateStats, getOtherStats, getOverviewStats };
// Followers
export { followUser, unfollowUser };
