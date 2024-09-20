import { RecordsData } from "@/types";
import { FC } from "react";

interface TableRowData {
  sn: number;
  date: string;
  time: string;
  cumFlowTime: number;
  wellheadVelocity: number;
  chokeSize: number;
  tubingCasing: number;
  flowTemp: number;
  static: number;
  temperature: number;
  rate: number;
  cum: number;
  inService: string;
  diff: number;
  vConeInService: string;
}

const data: TableRowData[] = [
  {
    sn: 1,
    date: "2024/05/26",
    time: "10:00",
    cumFlowTime: 0.0,
    wellheadVelocity: 3.2,
    chokeSize: 12.7,
    tubingCasing: 16985,
    flowTemp: 22,
    static: 3.2,
    temperature: 12.7,
    rate: 16985,
    cum: 0.0,
    inService: "Pipe",
    diff: 0.12,
    vConeInService: "Yes",
  },
];

interface ReportDataTableProps {
  recordsData: RecordsData | null;
}

export const ReportDataTable: FC<ReportDataTableProps> = async ({
  recordsData,
}) => {
  const transformHeaders = (headerData: RecordsData | null) => {
    if (headerData) {
      return headerData.data.flatMap((dataItem) =>
        dataItem.recordTypes.flatMap((recordType) => recordType.dataRecords)
      );
    }
    return [];
  };

  // console.log("kiejje", recordsData?.data.length);

  const tableDataffs = transformHeaders(recordsData);

  return tableDataffs.length < 1 ? (
    <div className="flex w-full justify-center bg-gray-800 py-4">
      There are no recent reports available.
    </div>
  ) : (
    <table className="min-w-full table-auto text-left text-sm font-light">
      <thead className="bg-gray-800 text-white">
        <tr>
          {tableDataffs.map((header, index) => (
            <th key={index} className="text-nowrap px-4 py-2 text-center">
              {header.dataTypeName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* {tableDataffs.map((row, index) => (
          <tr key={row.id} className="bg-gray-700 text-white">
            <td className="border-b px-4 py-2 text-center">
              {row.value || "N/A"}
            </td>
          </tr>
        ))} */}
        {recordsData?.data.map((row) => (
          <tr key={row.id} className="bg-gray-700 text-white">
            {row.recordTypes[0].dataRecords.map((dataRecord, idx) => (
              <td
                key={dataRecord.id}
                className={`border-b ${row.recordTypes[0].dataRecords.length - 1 !== idx ? "border-r" : ""} px-4 py-2 text-center`}
              >
                {dataRecord.value || "N/A"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
