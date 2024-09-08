import { Option, mediaTypeType } from "../constants/types";
import {
  Entry,
  UserDocEntry,
  UserDocEntryGroup,
} from "../constants/types/entry";
import { MediaDetailGenre, ProductionCountry } from "../constants/types/media";
import { StatType } from "../constants/types/stats";

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

export const findExistingEntry = (
  entries: UserDocEntryGroup,
  mediaid: number,
  mediaType: mediaTypeType
) => {
  let existingEntry;
  existingEntry = entries?.[mediaType as keyof UserDocEntryGroup]?.find(
    (entry: UserDocEntry) => entry.mediaid == mediaid
  );
  return existingEntry;
};

export const calculateElapsedTime = (dateString: string): string => {
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

export const generateFilterCountryOptions = (
  entries: Entry[] | undefined
): Option[] => {
  const options: Option[] = [];
  if (entries) {
    entries.forEach((entry: Entry) => {
      entry.data?.production_countries?.forEach(
        (country: ProductionCountry) => {
          if (!options.some((option) => option.value === country.iso_3166_1)) {
            options.push({
              value: country.iso_3166_1,
              label: country.name,
            });
          }
        }
      );
    });
  }
  return options;
};

export const generateFilterGenreOptions = (
  entries: Entry[] | undefined
): Option[] => {
  const options: Option[] = [];
  if (entries) {
    entries.forEach((entry: Entry) => {
      const genres: MediaDetailGenre[] = entry.data?.genres;
      genres?.forEach((genre: MediaDetailGenre) => {
        if (!options.some((option) => option.value === genre.id.toString())) {
          options.push({
            value: genre.id.toString(),
            label: genre.name,
          });
        }
      });
    });
  }
  return options;
};

export const generateProgressScale = (input: number) => {
  // Define the range scale
  const rangeScale = [
    0, 5, 10, 15, 20, 50, 100, 150, 200, 500, 1000, 1500, 2000, 5000, 10000,
  ];

  // Find the index of the closest number in the range scale that is less than or equal to the input
  let lowerIndex = rangeScale.findIndex((n) => n >= input) - 1;
  lowerIndex = lowerIndex < 0 ? 0 : lowerIndex;

  // Calculate the lower, middle, and upper numbers
  const lowerNumber = rangeScale[lowerIndex];
  const upperNumber =
    rangeScale[lowerIndex + 2] || rangeScale[rangeScale.length - 1];
  const middleNumber = rangeScale[lowerIndex + 1] || rangeScale[lowerIndex];

  return { lowerNumber, middleNumber, upperNumber };
};

export const combineStats = (
  movieStats: StatType[],
  tvStats: StatType[]
): StatType[] => {
  const statMap: Map<number, StatType> = new Map();

  const addOrUpdateStat = (stat: StatType) => {
    const existingStat = statMap.get(stat.statTypeId);

    if (existingStat) {
      existingStat.count += stat.count;
      existingStat.meanScore += stat.meanScore;
      existingStat.timeWatched += stat.timeWatched;
    } else {
      statMap.set(stat.statTypeId, {
        title: stat.title,
        statTypeId: stat.statTypeId,
        count: stat.count,
        meanScore: stat.meanScore,
        timeWatched: stat.timeWatched,
        _id: stat._id,
      });
    }
  };

  movieStats.forEach(addOrUpdateStat);
  tvStats.forEach(addOrUpdateStat);

  const stats = Array.from(statMap.values());

  const sortedStats = stats.sort((a, b) => b.count - a.count);

  return sortedStats;
};
