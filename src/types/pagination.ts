export interface Pagination {
  cursor: number | null;
  limit?: number;
  direction: "next" | "prev" | null;
}
