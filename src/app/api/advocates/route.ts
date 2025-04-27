import { NextRequest, NextResponse } from "next/server";
import { advocatesService } from "../../../server/services/advocates";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");

  const { data, nextCursor } = await advocatesService.getAll({
    cursor: cursor,
    limit: limit,
    search: search,
  });

  return NextResponse.json({ data, cursor: nextCursor });
}
