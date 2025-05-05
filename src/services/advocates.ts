import { Advocate } from "../types/advocate";
import { Filters } from "../types/filters";
import { Pagination } from "../types/pagination";
import { buildQuery } from "../utils";

class Advocates {
  baseUrl: string;

  constructor() {
    this.baseUrl = "/api/advocates";
  }
  async getAdvocates(
    pagination: Pagination,
    filters: Filters
  ): Promise<{
    advocates: Advocate[];
    nextCursor: number | null;
    hasNextData: boolean;
  }> {
    const paginationQuery = buildQuery(pagination);
    const filtersQuery = buildQuery(filters);
    let finalUrl = `${this.baseUrl}?${paginationQuery}`;

    if (filtersQuery) {
      finalUrl = `${finalUrl}&${filtersQuery}`;
    }
    const response = await fetch(finalUrl);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    return {
      advocates: data.data,
      nextCursor: data.nextCursor,
      hasNextData: data.hasNextData,
    };
  }
}

export const advocatesService = new Advocates();
