import { NextRequest } from "next/server";

export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get('token')?.value || null;
}