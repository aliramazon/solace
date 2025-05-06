import { NextRequest, NextResponse } from "next/server";
import { advocatesService } from "../../../server/services/advocates";
import { SortableColumn, SortDirection } from "../../../server/types";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const offset = searchParams.get("offset");
  const city = searchParams.get("city");
  const column = searchParams.get("column") as SortableColumn;
  const direction = searchParams.get("direction") as SortDirection;

  const result = await advocatesService.getAll({
    pagination: {
      offset: offset,
      limit: limit,
    },
    filters: {
      search: search,
      city: city,
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
