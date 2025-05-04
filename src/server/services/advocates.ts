import {
  and,
  asc,
  desc,
  ilike,
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
    nextCursor: string | null;
    hasNextData: boolean;
  }> {
    const [cursorExp, cursorId] = pagination.cursor
      ? pagination.cursor.split("_").map((x) => parseInt(x, 10))
      : [null, null];

    const parsedLimit = pagination.limit ? parseInt(pagination.limit, 10) : 20;
    const filtersArr = [];

    if (cursorExp !== null && cursorId !== null) {
      const comparator =
        pagination.direction === "next"
          ? sql`(${advocates.yearsOfExperience}, ${advocates.id}) < (${cursorExp}, ${cursorId})`
          : sql`(${advocates.yearsOfExperience}, ${advocates.id}) > (${cursorExp}, ${cursorId})`;

      filtersArr.push(comparator);
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

    const orderBy = [
      pagination.direction === "next"
        ? desc(advocates.yearsOfExperience)
        : asc(advocates.yearsOfExperience),
      pagination.direction === "next" ? desc(advocates.id) : asc(advocates.id),
    ];

    const data = await db
      .select()
      .from(advocates)
      .where(and(...filtersArr))
      .orderBy(...orderBy)
      .limit(parsedLimit + 1);

    let hasNextData = false;
    let nextCursor = null;
    let finalData: InferSelectModel<typeof advocates>[] = [];

    if (pagination.direction === "next" && data.length) {
      finalData = data.slice(0, parsedLimit);
      const last = finalData[finalData.length - 1];
      nextCursor = `${last.yearsOfExperience}_${last.id}`;
      if (data.length > parsedLimit) {
        hasNextData = true;
      } else {
        hasNextData = false;
      }
    }

    if (
      pagination.direction === "prev" &&
      cursorId !== null &&
      cursorExp !== null
    ) {
      if (data.length > parsedLimit) {
        finalData = data.slice(0, parsedLimit);
      } else {
        finalData = data;
      }

      finalData = finalData.reverse();
      nextCursor = `${cursorExp}_${cursorId}`;

      const newerRow = await db
        .select()
        .from(advocates)
        .where(
          and(
            sql`(${advocates.yearsOfExperience}, ${advocates.id}) > (${cursorExp}, ${cursorId})`,
            ...searchFilters
          )
        )
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
