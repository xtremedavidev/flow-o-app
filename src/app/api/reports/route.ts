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
        Authorization: `Bearer ${decryptedToken}`,
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
