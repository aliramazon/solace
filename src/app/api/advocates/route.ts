import { NextRequest, NextResponse } from "next/server";
import { advocatesService } from "../../../server/services/advocates";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");

  const { data, nextCursor } = await advocatesService.getAll({
    cursor: cursor,
    limit: limit,
  });

  return NextResponse.json({ data, cursor: nextCursor });
}
