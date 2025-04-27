import { asc, gt, type InferSelectModel } from "drizzle-orm";
import { db } from "../../db";
import { advocates } from "../../db/schema";

type GetAllParams = {
  limit: string | null;
  cursor: string | null;
};

class AdvocatesService {
  async getAll({ limit, cursor }: GetAllParams): Promise<{
    data: InferSelectModel<typeof advocates>[];
    nextCursor: number | null;
  }> {
    const parsedCursor = cursor ? parseInt(cursor, 10) : undefined;
    const parsedLimit = limit ? parseInt(limit, 10) : 20;

    const data = await db
      .select()
      .from(advocates)
      .where(parsedCursor ? gt(advocates.id, parsedCursor) : undefined)
      .orderBy(asc(advocates.id))
      .limit(parsedLimit);

    const nextCursor = data.length > 0 ? data[data.length - 1].id : null;

    return { data, nextCursor };
  }
}

export const advocatesService = new AdvocatesService();
