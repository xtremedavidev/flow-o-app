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
      Authorization: `Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZTM5MmJhNjUtNTI4MS00YjUwLTlkMTMtY2Q1ODdmNDk2YzM3IiwiZmlyc3RfbmFtZSI6IlNhbXVlbCIsImxhc3RfbmFtZSI6IlVtb2giLCJpbWFnZSI6Imh0dHBzOi8vZmxvdy1vcHRpeC1idWNrZXQuczMuYW1hem9uYXdzLmNvbS82NDljOWFhYy1kNTQzLTQyNWMtYWFjZS04YzE3MjRhODczN2IuanBnIiwiY29tcGFueU5hbWUiOiJTaGVsbCBQbGMiLCJjb21wYW55TG9jYXRpb24iOiIzMyBaQSBXaWxsaWFtcyBBbGJlcnRhIENhbmFkYSIsImVtYWlsIjoidW1vaHNnQGdtYWlsLmNvbSIsInBob25lIjoiMDgxNDQ0NjI1ODQiLCJwYXNzd29yZCI6IiQyYSQxMCRUb0VUakVUUVZaSE82c1RyT1dzSEd1WTQyQnRCSEVCQjZvc0JSNXJNQjM4Q2JKdVVpeGdtRyIsInN0YXR1cyI6IkFDVElWRSIsImFjdGl2YXRlZCI6dHJ1ZSwicGljdHVyZSI6bnVsbCwidG9rZW4iOm51bGwsImF1dGhUb2tlbiI6IjQ0NzUiLCJjcmVhdGVkQXQiOiIyMDI0LTA4LTE3VDAxOjM2OjE1LjkyNFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTEwLTI1VDE0OjI4OjE5LjE5MFoifSwiaWF0IjoxNzMxNzI3OTQ4fQ.Sv-5mgSBe63yf5eki0n1CEoHktxyXjJKhBX5VmmTFaI`,
      // Authorization: `Bearer ${decryptedToken}`,
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch reports data" });
  }

  const data: ReportsResponse = await res.json();
  return NextResponse.json(data);
}
