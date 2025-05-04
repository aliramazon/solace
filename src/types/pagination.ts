export interface Pagination {
  cursor: string | null;
  limit?: number;
  direction: "next" | "prev" | null;
}
