import {
  and,
  asc,
  desc,
  eq,
  ilike,
  or,
  sql,
  type InferSelectModel,
} from "drizzle-orm";
import { db } from "../../db";
import { advocates } from "../../db/schema";

import { Filters, Pagination, Sort } from "../types";

type GetAllParams = {
  pagination: Pagination;
  filters: Filters;
  sort: Sort;
};

class AdvocatesService {
  async getAll({ pagination, filters, sort }: GetAllParams): Promise<{
    data: InferSelectModel<typeof advocates>[];
    hasNextData: boolean;
  }> {
    const parsedOffset = pagination.offset
      ? parseInt(pagination.offset, 10)
      : 0;
    const parsedLimit = pagination.limit ? parseInt(pagination.limit, 10) : 20;
    const sortColumn = sort?.column ?? "id";
    const sortDirection = sort?.direction ?? "asc";

    const filtersArr = [];

    if (filters.search) {
      const searchFilters = [];
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
      filtersArr.push(...searchFilters);
    }

    if (filters.city) {
      filtersArr.push(eq(advocates.city, filters.city));
    }

    if (filters.specialty) {
      const joinedSpecialties = sql.join(
        filters.specialty.map((s) => sql`${s}`),
        sql`, `
      );

      const specialtyFilter = sql`${advocates.specialties} ?| array[${joinedSpecialties}]`;

      filtersArr.push(specialtyFilter);
    }

    let orderBy = [asc(advocates.id)];

    if (sortColumn === "yearsOfExperience") {
      if (sortDirection === "asc") {
        orderBy = [asc(advocates.yearsOfExperience), asc(advocates.id)];
      } else {
        orderBy = [desc(advocates.yearsOfExperience), desc(advocates.id)];
      }
    } else if (sortColumn === "id") {
      if (sortDirection === "desc") {
        orderBy = [desc(advocates.id)];
      }
    }

    let data = await db
      .select()
      .from(advocates)
      .where(and(...filtersArr))
      .offset(parsedOffset)
      .orderBy(...orderBy)
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
