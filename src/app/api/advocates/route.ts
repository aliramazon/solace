import { NextRequest, NextResponse } from "next/server";
import { advocatesService } from "../../../server/services/advocates";
import { SortableColumn, SortDirection } from "../../../server/types";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const offset = searchParams.get("offset");
  const city = searchParams.get("city");
  const specialty = searchParams.get("specialty");
  const column = searchParams.get("column") as SortableColumn;
  const direction = searchParams.get("direction") as SortDirection;
  console.log(specialty);

  const result = await advocatesService.getAll({
    pagination: {
      offset: offset,
      limit: limit,
    },
    filters: {
      search: search,
      city: city,
      specialty: specialty ? specialty.split("_") : null,
    },
    sort: {
      column,
      direction,
    },
  });

  return NextResponse.json({
    ...result,
  });
}
