export type PaginationDirection = "prev" | "next" | null;

export interface Pagination {
  limit: string | null;
  cursor: string | null;
  direction: PaginationDirection;
}
