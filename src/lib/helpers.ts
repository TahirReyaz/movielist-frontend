import {
  IEntry,
  IUserDocEntryGroup,
  TUserDocEntry,
} from "../constants/Interfaces/entry";
import { EntryCountry, TMediaType } from "../constants/Interfaces/media";
import { TOption } from "../constants/Interfaces/misc";
import { IStat } from "../constants/Interfaces/stats";

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
  entries: IUserDocEntryGroup,
  mediaid: string,
  mediaType: TMediaType
) => {
  let existingEntry;
  existingEntry = entries?.[mediaType as keyof IUserDocEntryGroup]?.find(
    (entry: TUserDocEntry) => entry.mediaid == mediaid
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

/** Countries of an entry. Newer entries store production_countries; older ones only origin_country codes. */
export const getEntryCountries = (entry: IEntry): EntryCountry[] => {
  const data = entry.data;
  if (!data) return [];
  if (data.production_countries && data.production_countries.length > 0) {
    return data.production_countries;
  }
  return (data.origin_country ?? []).map((code) => ({
    iso_3166_1: code,
    name: code,
  }));
};

/** Release year of an entry (movie release / season air date), or null. */
export const getEntryReleaseYear = (entry: IEntry): number | null => {
  const date = entry.data?.release_date;
  if (!date) return null;
  const year = new Date(date).getFullYear();
  return Number.isNaN(year) ? null : year;
};

export const generateFilterCountryOptions = (
  entries: IEntry[] | undefined
): TOption[] => {
  const options: TOption[] = [];
  entries?.forEach((entry) => {
    getEntryCountries(entry).forEach((country) => {
      if (!options.some((option) => option.value === country.iso_3166_1)) {
        options.push({ value: country.iso_3166_1, label: country.name });
      }
    });
  });
  return options;
};

export const generateFilterGenreOptions = (
  entries: IEntry[] | undefined
): TOption[] => {
  const options: TOption[] = [];
  entries?.forEach((entry) => {
    entry.data?.genres?.forEach((genre) => {
      const value = String(genre.id);
      if (!options.some((option) => option.value === value)) {
        options.push({ value, label: genre.name });
      }
    });
  });
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

/**
 * Merge movie + tv stats of the same genre/tag.
 * Mean score is a count-weighted average (adding the two means was wrong).
 */
export const combineStats = (
  movieStats: IStat[],
  tvStats: IStat[]
): IStat[] => {
  const statMap = new Map<string, IStat & { scoreWeight: number }>();

  const addOrUpdateStat = (stat: IStat) => {
    const key = String(stat.statTypeId);
    const weight = stat.meanScore > 0 ? stat.count : 0;
    const existing = statMap.get(key);

    if (existing) {
      const totalWeight = existing.scoreWeight + weight;
      existing.meanScore = totalWeight
        ? (existing.meanScore * existing.scoreWeight + stat.meanScore * weight) /
          totalWeight
        : 0;
      existing.scoreWeight = totalWeight;
      existing.count += stat.count;
      existing.timeWatched += stat.timeWatched;
    } else {
      statMap.set(key, { ...stat, statTypeId: key, scoreWeight: weight });
    }
  };

  movieStats.forEach(addOrUpdateStat);
  tvStats.forEach(addOrUpdateStat);

  return Array.from(statMap.values())
    .map(({ scoreWeight, ...stat }) => stat)
    .sort((a, b) => b.count - a.count);
};

export const capitaliseFirst = (s: string): string => {
  let ans = s[0].toUpperCase();
  ans += s.slice(1, s.length);
  return ans;
};

export const passwordValidity = (password: string) => {
  // regex for password validation (at least 1 uppercase, 1 lowercase, 1 number, 1 special character,  min 8 characters long)
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const result = re.test(password);
  return result;
};
