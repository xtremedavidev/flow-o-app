import { ReportsResponse } from "@/types";
import { decryptToken, fetcher } from "@/utils";
import { cookies } from "next/headers";

export async function getReports() {
  const token = cookies().get("token")?.value;

  const resp =
    // unstable_cache(
    async () => {
      const decryptedToken = token
        ? decryptToken(decodeURIComponent(token))
        : undefined;

      // if (!token) {
      //   throw new Error("Session expired. Please login again");
      // }

      const reportsData = await fetcher<ReportsResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-reports`,
        {
          method: "GET",
          data: {},
          token: decryptedToken,
          // enabled: decryptedToken !== undefined && decryptedToken ? true : false,
        }
      );

      if (!reportsData) {
        throw new Error("Failed to fetch reports data");
      }

      return reportsData;
    };
  // ,
  // undefined,
  // { tags: ["getReportsTag"], revalidate: 60 }
  // );

  const data = await resp();

  return data;
}
