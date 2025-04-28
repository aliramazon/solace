import {
  and,
  asc,
  desc,
  gt,
  ilike,
  lte,
  or,
  sql,
  type InferSelectModel,
} from "drizzle-orm";
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
    nextCursor: number | null;
    hasNextData: boolean;
  }> {
    const parsedCursor = pagination.cursor
      ? parseInt(pagination.cursor, 10)
      : null;
    const parsedLimit = pagination.limit ? parseInt(pagination.limit, 10) : 20;
    const filtersArr = [];

    if (parsedCursor) {
      if (pagination.direction === "next") {
        filtersArr.push(gt(advocates.id, parsedCursor));
      } else if (pagination.direction === "prev") {
        filtersArr.push(lte(advocates.id, parsedCursor));
      }
    }

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

    const orderBy =
      pagination.direction === "next" ? asc(advocates.id) : desc(advocates.id);

    const data = await db
      .select()
      .from(advocates)
      .where(and(...filtersArr))
      .orderBy(orderBy)
      .limit(parsedLimit + 1);

    let hasNextData = false;
    let nextCursor = null;
    let finalData: InferSelectModel<typeof advocates>[] = [];

    if (pagination.direction === "next" && data.length) {
      finalData = data.slice(0, parsedLimit);
      nextCursor = finalData[finalData.length - 1].id;
      if (data.length > parsedLimit) {
        hasNextData = true;
      } else {
        hasNextData = false;
      }
    }

    if (pagination.direction === "prev" && parsedCursor !== null) {
      if (data.length > parsedLimit) {
        finalData = data.slice(0, parsedLimit);
      } else {
        finalData = data;
      }

      finalData = finalData.reverse();
      nextCursor = parsedCursor;

      const newerRow = await db
        .select()
        .from(advocates)
        .where(and(gt(advocates.id, parsedCursor), ...searchFilters))
        .limit(1);

      hasNextData = newerRow.length > 0;
    }

    return {
      data: finalData,
      nextCursor,
      hasNextData,
    };
  }
}
export const advocatesService = new AdvocatesService();
