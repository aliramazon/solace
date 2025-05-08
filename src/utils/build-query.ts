import { Filters } from "../types/filters";
import { Pagination } from "../types/pagination";
import { Sort } from "../types/sort";

export const buildQuery = (filters: Filters | Pagination | Sort) => {
  const query: string[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (value && !Array.isArray(value)) {
      query.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      );
    } else if (Array.isArray(value) && value.length > 0) {
      query.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value.join("_"))}`
      );
    }
  });

  return query.join("&");
};
