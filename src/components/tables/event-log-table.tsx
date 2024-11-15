import { getRecords } from "@/server";
import { formatDate } from "@/utils";
// import Cookies from "js-cookie";

export const EventLogTable = async () => {
  // const token = Cookies.get("token");
  // const decryptedToken = token
  //   ? decryptToken(decodeURIComponent(token))
  //   : undefined;

  // const reportsData = await getReports();
  const reportsData = await getRecords();

  if (reportsData === null || "error" in reportsData) {
    return <div>Failed to fetch reports data</div>;
  }

  return reportsData && reportsData.data?.data.length < 1 ? (
    <div className="flex w-full justify-center bg-gray-800 py-4">
      There are no recent events available.
    </div>
  ) : (
    <table className="min-w-full text-left text-sm font-light">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border-r px-8 py-4">Date</th>
          <th className="border-r px-8 py-4">Time</th>
          <th className="text-nowrap border-r px-8 py-4">Reported by</th>
          <th className="border-r px-8 py-4">Location</th>
          <th className="w-[500px] px-8 py-4">Description</th>
        </tr>
      </thead>
      <tbody className="border-t">
        {reportsData?.data?.data.map((row, index) => {
          const { formattedDate, formattedTime } = formatDate(row.updatedAt);

          return (
            <tr
              key={index}
              className="bg-[#1D2429] text-white hover:bg-gray-700"
            >
              <td className="border-b border-r px-4 py-4">{formattedDate}</td>
              <td className="border-b border-r px-4 py-4">{formattedTime}</td>
              <td className="border-b border-r px-4 py-4">
                {row.user.first_name} {row.user.last_name}
              </td>
              <td className="border-b border-r px-4 py-4">
                {row.well.location}
              </td>
              <td width="500px" className="border-b px-2 py-2">
                {row.recordDescription}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
