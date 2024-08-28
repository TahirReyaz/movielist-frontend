// Function to format runtime to hours and minutes
export const formatRuntime = (runtime: any) => {
  const totalMinutes = parseInt(runtime, 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

export const formatTimeWatched = (hours: number) => {
  const days = Math.floor(hours / 24);
  const remainingHours = Math.round(hours % 24);

  return { days, hours: remainingHours };
};

export const generateYearOptions = (start = 1887) => {
  const currentYear = new Date().getFullYear();
  const startYear = start;
  const years = [];

  for (let year = currentYear + 1; year >= startYear; year--) {
    years.push({ value: `${year}`, label: year });
  }

  return years;
};

export const updateList = (lists: any, allowedList: string) => {
  const newList = lists;
  if (lists && lists.all) {
    if (allowedList === "all") {
      newList.lists = lists.all;
    } else {
      newList.lists = lists.all.filter((grp: any) => grp.type === allowedList);
    }
  }

  return newList;
};

export const findExistingEntry = (userData: any, mediaid: string) => {
  let existingEntry;
  existingEntry = userData?.entries?.find(
    (entry: any) => entry.mediaid == mediaid
  );
  return existingEntry;
};

export const calculateElasedTime = (dateString: string): string => {
  const now = new Date();
  const pastDate = new Date(dateString);
  const differenceInMilliseconds = now.getTime() - pastDate.getTime();

  const minutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7)
  );
  const months = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30.44)
  );
  const years = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  );

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};

export const formatDateForInput = (dateString: string): string => {
  const dateObj = new Date(dateString);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
