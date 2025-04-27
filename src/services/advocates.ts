import { Advocate } from "../types/advocate";

type GetAdvocates = {
  pagination: { cursor: number | null; limit?: number };
};

class Advocates {
  async getAdvocates(
    filters: GetAdvocates
  ): Promise<{ advocates: Advocate[]; cursor: number }> {
    const response = await fetch(
      `/api/advocates?cursor=${filters.pagination.cursor}&limit=${filters.pagination.limit}`
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    return { advocates: data.data, cursor: data.cursor };
  }
}

export const advocatesService = new Advocates();
