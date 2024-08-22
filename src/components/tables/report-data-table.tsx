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

export const ReportDataTable: React.FC = () => {
  return (
    <table className="min-w-full table-auto text-left text-sm font-light">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th colSpan={4} className="border-r border-gray-600 px-4 py-2">
            Test Time Zone
          </th>
          <th colSpan={3} className="border-r border-gray-600 px-4 py-2">
            Well: B-072-K/094-A-12
          </th>
          <th colSpan={3} className="border-r border-gray-600 px-4 py-2">
            High Stages
          </th>
          <th colSpan={3} className="border-r border-gray-600 px-4 py-2">
            Data Summary
          </th>
          <th colSpan={3} className="px-4 py-2">
            Low Stages
          </th>
        </tr>
        <tr>
          <th className="px-4 py-2">S/N</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Time</th>
          <th className="px-4 py-2">Cum Flow Time</th>
          <th className="px-4 py-2">Wellhead Velocity</th>
          <th className="px-4 py-2">Choke Size</th>
          <th className="px-4 py-2">Tubing/Casing</th>
          <th className="px-4 py-2">Flow Temp</th>
          <th className="px-4 py-2">Static</th>
          <th className="px-4 py-2">Temperature</th>
          <th className="px-4 py-2">Rate</th>
          <th className="px-4 py-2">Cum</th>
          <th className="px-4 py-2">In Service</th>
          <th className="px-4 py-2">Static</th>
          <th className="px-4 py-2">Diff</th>
          <th className="px-4 py-2">V-Cone In Service</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="bg-gray-700 text-white">
            <td className="border-b px-4 py-2">{row.sn}</td>
            <td className="border-b px-4 py-2">{row.date}</td>
            <td className="border-b px-4 py-2">{row.time}</td>
            <td className="border-b px-4 py-2">{row.cumFlowTime.toFixed(2)}</td>
            <td className="border-b px-4 py-2">{row.wellheadVelocity}</td>
            <td className="border-b px-4 py-2">{row.chokeSize}</td>
            <td className="border-b px-4 py-2">{row.tubingCasing}</td>
            <td className="border-b px-4 py-2">{row.flowTemp}</td>
            <td className="border-b px-4 py-2">{row.static}</td>
            <td className="border-b px-4 py-2">{row.temperature}</td>
            <td className="border-b px-4 py-2">{row.rate}</td>
            <td className="border-b px-4 py-2">{row.cum}</td>
            <td className="border-b px-4 py-2">{row.inService}</td>
            <td className="border-b px-4 py-2">{row.static}</td>
            <td className="border-b px-4 py-2">{row.diff}</td>
            <td className="border-b px-4 py-2">{row.vConeInService}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
