import {
  and,
  asc,
  gt,
  ilike,
  or,
  sql,
  type InferSelectModel,
} from "drizzle-orm";
import { db } from "../../db";
import { advocates } from "../../db/schema";

type GetAllParams = {
  limit: string | null;
  cursor: string | null;
  search: string | null;
};

class AdvocatesService {
  async getAll({ limit, cursor, search }: GetAllParams): Promise<{
    data: InferSelectModel<typeof advocates>[];
    nextCursor: number | null;
  }> {
    const parsedCursor = cursor ? parseInt(cursor, 10) : undefined;
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    const filters = [];

    filters.push(parsedCursor ? gt(advocates.id, parsedCursor) : undefined);

    if (search) {
      const value = `%${search.toLowerCase()}%`;
      const castedYearsOfExperience = sql`CAST(${advocates.yearsOfExperience} as TEXT)`;
      const specialtiesCondition = sql`
        EXISTS(
          SELECT 1
          FROM jsonb_array_elements_text(${advocates.specialties}) as speciality
          WHERE speciality ILIKE ${value}
        )
      `;

      const searchCondtion = or(
        ilike(advocates.firstName, value),
        ilike(advocates.lastName, value),
        ilike(advocates.city, value),
        ilike(advocates.degree, value),
        sql`${castedYearsOfExperience} ILIKE ${value}`,
        specialtiesCondition
      );
      filters.push(searchCondtion);
    }

    const data = await db
      .select()
      .from(advocates)
      .where(and(...filters))
      .orderBy(asc(advocates.id))
      .limit(parsedLimit);

    const nextCursor = data.length > 0 ? data[data.length - 1].id : null;

    return { data, nextCursor };
  }
}

export const advocatesService = new AdvocatesService();
