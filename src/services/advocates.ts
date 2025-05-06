import { Advocate } from "../types/advocate";
import { Filters } from "../types/filters";
import { Pagination } from "../types/pagination";
import { Sort } from "../types/sort";
import { buildQuery } from "../utils";

class Advocates {
  baseUrl: string;

  constructor() {
    this.baseUrl = "/api/advocates";
  }
  async getAdvocates(
    pagination: Pagination,
    filters: Filters,
    sort: Sort
  ): Promise<{
    advocates: Advocate[];
    nextCursor: number | null;
    hasNextData: boolean;
  }> {
    let finalUrl = `${this.baseUrl}?${buildQuery({
      ...pagination,
      ...filters,
      ...sort,
    })}`;

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
