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

export const generateYearOptions = (start = 1888) => {
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
