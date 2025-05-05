export type PaginationDirection = "prev" | "next" | null;

export interface Pagination {
  limit: string | null;
  offset: string | null;
}
