import { ReportsResponse } from "@/types";
import { decryptToken } from "@/utils";
// import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token");
  // const token = request.headers.get("authorization")?.split("Bearer ")[1];

  if (!token) {
    return NextResponse.json({ error: "No token found, please login again" });
  }

  const decryptedToken = decryptToken(decodeURIComponent(token.value));
  // const decryptedToken = token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-reports`, {
    method: "GET",
    headers: {
     
      Authorization: `Bearer ${decryptedToken}`,
    },
    next: { revalidate: 10 },
  });


  console.log("tokener", decryptedToken)
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch reports data" });
  }

  const data: ReportsResponse = await res.json();
  return NextResponse.json(data);
}
