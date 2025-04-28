import { Filters } from "../types/filters";
import { Pagination } from "../types/pagination";

export const buildQuery = (filters: Filters | Pagination) => {
  const query: string[] = [];

  Object.entries(filters).forEach((entry) => {
    if (entry[1] && !Array.isArray(entry[1])) {
      query.push(`${entry[0]}=${entry[1]}`);
    } else if (Array.isArray(entry[1]) && entry[1].length > 0) {
      query.push(`${entry[0]}=${entry[1].join(",")}`);
    }
  });

  return query.join("&");
};
