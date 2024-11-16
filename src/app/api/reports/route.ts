import { ReportsResponse } from "@/types";
import { decryptToken } from "@/utils";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token");
  console.log("serverless")

  if (!token) {
    console.error("Token not found in cookies");
    return NextResponse.json({ error: "No token found, please login again" });
  }

  let decryptedToken: string;
  try {
    decryptedToken = decryptToken(decodeURIComponent(token.value));
    console.log("Decrypted token:", decryptedToken);
  } catch (error) {
    console.error("Error decrypting token:", error);
    return NextResponse.json({ error: "Invalid token" });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  if (!baseUrl) {
    console.error("Base URL not defined in environment variables");
    return NextResponse.json({ error: "Server configuration error" });
  }

  try {
    const res = await fetch(`${baseUrl}/record-gateway/get-reports`, {
      method: "GET",
      headers: {
        Authorization: `Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZTM5MmJhNjUtNTI4MS00YjUwLTlkMTMtY2Q1ODdmNDk2YzM3IiwiZmlyc3RfbmFtZSI6IlNhbXVlbCIsImxhc3RfbmFtZSI6IlVtb2giLCJpbWFnZSI6Imh0dHBzOi8vZmxvdy1vcHRpeC1idWNrZXQuczMuYW1hem9uYXdzLmNvbS82NDljOWFhYy1kNTQzLTQyNWMtYWFjZS04YzE3MjRhODczN2IuanBnIiwiY29tcGFueU5hbWUiOiJTaGVsbCBQbGMiLCJjb21wYW55TG9jYXRpb24iOiIzMyBaQSBXaWxsaWFtcyBBbGJlcnRhIENhbmFkYSIsImVtYWlsIjoidW1vaHNnQGdtYWlsLmNvbSIsInBob25lIjoiMDgxNDQ0NjI1ODQiLCJwYXNzd29yZCI6IiQyYSQxMCRUb0VUakVUUVZaSE82c1RyT1dzSEd1WTQyQnRCSEVCQjZvc0JSNXJNQjM4Q2JKdVVpeGdtRyIsInN0YXR1cyI6IkFDVElWRSIsImFjdGl2YXRlZCI6dHJ1ZSwicGljdHVyZSI6bnVsbCwidG9rZW4iOm51bGwsImF1dGhUb2tlbiI6IjQ0NzUiLCJjcmVhdGVkQXQiOiIyMDI0LTA4LTE3VDAxOjM2OjE1LjkyNFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTEwLTI1VDE0OjI4OjE5LjE5MFoifSwiaWF0IjoxNzMxNzI3OTQ4fQ.Sv-5mgSBe63yf5eki0n1CEoHktxyXjJKhBX5VmmTFaI`,
        // Authorization: `Bearer ${decryptedToken}`,
      },
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      const data: ReportsResponse = await res.json();
      const errorText = await res.text();
      console.error("Error fetching reports:", res.status, errorText);
      console.log("chk res2", data)
      return NextResponse.json({ error: "Failed to fetch reports data" });
    }

    const data: ReportsResponse = await res.json();
    console.log("chk res", data)
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error during fetch:", error);
    return NextResponse.json({ error: "Unexpected server error" });
  }
}
