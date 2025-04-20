import { Advocate } from "../types/advocate";

class Advocates {
  async getAdvocates(): Promise<Advocate[]> {
    const response = await fetch("/api/advocates");
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const { data } = await response.json();
    return data;
  }
}

export const advocatesService = new Advocates();
