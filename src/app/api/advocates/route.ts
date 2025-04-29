import { NextRequest, NextResponse } from "next/server";
import { advocatesService } from "../../../server/services/advocates";
import { PaginationDirection } from "../../../server/types";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const direction = searchParams.get("direction") as PaginationDirection;

  const result = await advocatesService.getAll({
    pagination: {
      cursor: cursor,
      limit: limit,
      direction: direction,
    },
    filters: {
      search: search,
    },
  });

  return NextResponse.json({
    ...result,
  });
}
