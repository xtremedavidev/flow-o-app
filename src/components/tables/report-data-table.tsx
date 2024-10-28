import { RecordsData } from "@/types";
import { formatDate } from "@/utils";
import { FC } from "react";

interface ReportDataTableProps {
  recordsData: RecordsData | null;
  dataTypeNames: string[];
}

export const ReportDataTable: FC<ReportDataTableProps> = async ({
  recordsData,
  dataTypeNames,
}) => {
  const tableDataffs = recordsData?.data[0].recordTypes[0].dataRecords || [];

  return tableDataffs.length < 1 ? (
    <div className="flex w-full justify-center bg-gray-800 py-4">
      There are no recent reports available.
    </div>
  ) : (
    <table className="min-w-full table-auto text-left text-sm font-light">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="text-nowrap border-r px-8 py-2 text-center">Date</th>
          <th className="text-nowrap border-r px-8 py-2 text-center">Time</th>
          {dataTypeNames.map((header, index) => (
            <th
              key={index}
              className={`text-nowrap ${dataTypeNames.length - 1 !== index ? "border-r" : ""} px-4 py-2 text-center`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border-t">
        {recordsData?.data.map((row) => {
          const { formattedDate, formattedTime } = formatDate(row.updatedAt);

          return (
            <tr
              key={row.id}
              className="bg-[#1D2429] text-white hover:bg-gray-700"
            >
              <td className="border-b border-r px-4 py-2">{formattedDate}</td>
              <td className="border-b border-r px-4 py-2">{formattedTime}</td>
              {/* {row.recordTypes[0].dataRecords.map((dataRecord, idx) => ( */}

              {dataTypeNames.map((atThisPointIDK, index) => {
                const secondIDK = row.recordTypes[0].dataRecords.find(
                  (record) => record.dataTypeName === atThisPointIDK
                );

                return (
                  <td
                    key={index}
                    className={`border-b ${row.recordTypes[0].dataRecords.length - 1 !== index ? "border-r" : ""} px-4 py-2 text-center`}
                  >
                    {secondIDK ? secondIDK.value : "N/A"}
                  </td>
                );
              })}
              {/* ))} */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
