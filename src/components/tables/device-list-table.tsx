export const DeviceListTable = () => {
  return (
    // <div className="h-[600px] overflow-x-auto overflow-y-auto">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-[16px] divide-[#202020] overflow-hidden rounded-[10px]">
        <thead className="rounded-[10px] bg-[#292929]">
          <tr>
            <th className="px-[15px] py-4 text-left text-base font-medium capitalize tracking-wider text-white">
              Device Name/Id
            </th>
            <th className="px-[15px] py-4 text-left text-base font-medium capitalize tracking-wider text-white">
              Type
            </th>
            <th className="px-[15px] py-4 text-left text-base font-medium capitalize tracking-wider text-white">
              Status
            </th>
            <th className="px-[15px] py-4 text-left text-base font-medium capitalize tracking-wider text-white">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="mt-4 divide-y-8 divide-[#202020]">
          {devices.map((device, index) => (
            <tr key={index} className="bg-[#292929]">
              <td className="whitespace-nowrap px-[15px] py-4 text-sm font-normal">
                {device.name_id}
              </td>
              <td className="whitespace-nowrap px-[15px] py-4 text-sm font-normal">
                {device.type}
              </td>
              <td className="whitespace-nowrap px-[15px] py-4 text-sm font-normal">
                <div className="flex items-center gap-[10px]">
                  <StatusIndicator status={device.status} />
                  <span>{device.status}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-[15px] py-4 text-sm font-normal">
                {device.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatusIndicator = ({ status }: { status: string }) => {
  return (
    <div
      className="flex h-3 w-3 shrink-0 rounded-full"
      style={{
        background: status === "Active" ? "#10A957" : "red",
      }}
    />
  );
};

const devices = [
  {
    name_id: "Pressure Sensor/D-002",
    type: "Barometer",
    status: "Active",
    location: "Site A - Well 001",
  },
  {
    name_id: "Pressure Sensor/D-002",
    type: "Barometer",
    status: "Active",
    location: "Site A - Well 001",
  },
  {
    name_id: "Pressure Sensor/D-002",
    type: "Barometer",
    status: "Active",
    location: "Site A - Well 001",
  },
  {
    name_id: "Pressure Sensor/D-002",
    type: "Barometer",
    status: "Active",
    location: "Site A - Well 001",
  },
  {
    name_id: "Pressure Sensor/D-002",
    type: "Barometer",
    status: "Active",
    location: "Site A - Well 001",
  },
  {
    name_id: "Pressure Sensor/D-002",
    type: "Barometer",
    status: "Active",
    location: "Site A - Well 001",
  },
  {
    name_id: "Pressure Sensor/D-002",
    type: "Barometer",
    status: "Active",
    location: "Site A - Well 001",
  },
];
