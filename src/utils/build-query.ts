import { Filters } from "../types/filters";
import { Pagination } from "../types/pagination";
import { Sort } from "../types/sort";

export const buildQuery = (filters: Filters | Pagination | Sort) => {
  const query: string[] = [];

  Object.entries(filters).forEach((entry) => {
    if (entry[1] && !Array.isArray(entry[1])) {
      query.push(`${entry[0]}=${entry[1]}`);
    } else if (Array.isArray(entry[1]) && entry[1].length > 0) {
      query.push(`${entry[0]}=${entry[1].join("_")}`);
    }
  });

  return query.join("&");
};
