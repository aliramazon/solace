export type SortableColumn = "yearsOfExperience" | "id" | "" | string;
export type SortDirection = "asc" | "desc" | "" | string;

export interface Sort {
  column: SortableColumn;
  direction: SortDirection;
}
