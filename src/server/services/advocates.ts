import { and, asc, ilike, or, sql, type InferSelectModel } from "drizzle-orm";
import { db } from "../../db";
import { advocates } from "../../db/schema";

import { Filters, Pagination } from "../types";

type GetAllParams = {
  pagination: Pagination;
  filters: Filters;
};

class AdvocatesService {
  async getAll({ pagination, filters }: GetAllParams): Promise<{
    data: InferSelectModel<typeof advocates>[];
    hasNextData: boolean;
  }> {
    const parsedOffset = pagination.offset
      ? parseInt(pagination.offset, 10)
      : 0;
    const parsedLimit = pagination.limit ? parseInt(pagination.limit, 10) : 20;
    const filtersArr = [];

    const searchFilters = [];
    if (filters.search) {
      const value = `%${filters.search.toLowerCase()}%`;
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
      searchFilters.push(searchCondtion);
    }
    filtersArr.push(...searchFilters);

    const orderBy = asc(advocates.id);

    let data = await db
      .select()
      .from(advocates)
      .where(and(...filtersArr))
      .offset(parsedOffset)
      .orderBy(orderBy)
      .limit(parsedLimit + 1);

    let hasNextData = false;
    let finalData: InferSelectModel<typeof advocates>[] = [];

    if (data.length > parsedLimit) {
      hasNextData = true;
    }

    finalData = data.slice(0, parsedLimit);

    return {
      data: finalData,
      hasNextData,
    };
  }
}
export const advocatesService = new AdvocatesService();
