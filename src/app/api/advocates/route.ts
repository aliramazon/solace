import { NextRequest, NextResponse } from "next/server";
import { advocatesService } from "../../../server/services/advocates";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const offset = searchParams.get("offset");

  const result = await advocatesService.getAll({
    pagination: {
      offset: offset,
      limit: limit,
    },
    filters: {
      search: search,
    },
  });

  return NextResponse.json({
    ...result,
  });
}
