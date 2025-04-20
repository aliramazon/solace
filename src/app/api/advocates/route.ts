import { advocatesService } from "../../../server/services/advocates";
export async function GET() {
  const data = await advocatesService.getAll();

  return Response.json({ data: data.slice(0, 50) });
}
