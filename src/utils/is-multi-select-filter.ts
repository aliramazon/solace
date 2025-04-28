import { FILTERS } from "../types/filters";

export const isMultiSelectFilter = (filterName: string) => {
  return FILTERS.multiSelection.includes(filterName);
};
