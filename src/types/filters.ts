export interface Filters {
  search?: string;
  city?: string;
  degree?: string;
  specialty?: string[];
}

export const FILTERS = {
  singleSelection: ["search", "city", "degree"],
  multiSelection: ["specialty"],
};
