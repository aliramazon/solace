export type SortableColumn = "yearsOfExperience" | "id" | "";
export type SortDirection = "asc" | "desc";

export interface Sort {
  column?: SortableColumn;
  direction?: SortDirection;
}
