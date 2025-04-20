import db from "../../db";
import { advocates } from "../../db/schema";

class Advocates {
  async getAll() {
    const data = await db.select().from(advocates);
    return data;
  }
}

export const advocatesService = new Advocates();
