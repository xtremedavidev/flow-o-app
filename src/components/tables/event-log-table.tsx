import { getReports } from "@/actions";
import { decryptToken, formatDate } from "@/utils";
import { cookies } from "next/headers";

export const EventLogTable = async () => {
  const token = cookies().get("token")?.value;
  const decryptedToken = token ? decryptToken(token) : undefined;
  const reportsData = await getReports(decryptedToken);

  if (reportsData === null) {
    return <div>Failed to fetch reports data</div>;
  }

  return reportsData.data.length < 1 ? (
    <div className="flex w-full justify-center bg-gray-800 py-4">
      There are no recent events available.
    </div>
  ) : (
    <table className="min-w-full table-auto text-left text-sm font-light">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-8 py-4">Date</th>
          <th className="px-8 py-4">Time</th>
          <th className="text-nowrap px-8 py-4">Reported by</th>
          <th className="border-r px-8 py-4">Location</th>
          <th colSpan={3} className="px-8 py-4">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {reportsData.data.map((row, index) => {
          const { formattedDate, formattedTime } = formatDate(row.updatedAt);

          return (
            <tr
              key={index}
              className="bg-[#1D2429] text-white hover:bg-gray-700"
            >
              <td className="border-b px-4 py-4">{formattedDate}</td>
              <td className="border-b px-4 py-4">{formattedTime}</td>
              <td className="border-b px-4 py-4">{row.user_id}</td>
              <td className="border-b border-r px-4 py-4">{row.wellId}</td>
              <td colSpan={3} className="border-b px-2 py-2">
                {row.description}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
