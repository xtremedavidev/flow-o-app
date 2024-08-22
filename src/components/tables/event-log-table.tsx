export const EventLogTable = () => {
  return (
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
        {data.map((row, index) => (
          <tr key={index} className="bg-[#1D2429] text-white hover:bg-gray-700">
            <td className="border-b px-4 py-4">{row.date}</td>
            <td className="border-b px-4 py-4">{row.time}</td>
            <td className="border-b px-4 py-4">{row.reportedBy}</td>
            <td className="border-b border-r px-4 py-4">{row.location}</td>
            <td colSpan={3} className="border-b px-2 py-2">
              {row.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface EventLogTableProps {
  data: {
    date: string;
    time: string;
    reportedBy: string;
    location: string;
    description: string;
  }[];
}

const data = [
  {
    date: "25/07/2024",
    time: "10:00 AM",
    reportedBy: "2024/05/26",
    location: "Well 2dsf",
    description:
      "Whatever the note is I just have to make this a two-line stuff to show the case of multiple lines at all...",
  },
  {
    date: "25/07/2024",
    time: "10:00 AM",
    reportedBy: "2024/05/26",
    location: "Well 2dsf",
    description:
      "Whatever the note is I just have to make this a two-line stuff to show the case of multiple lines at all...",
  },
  {
    date: "25/07/2024",
    time: "10:00 AM",
    reportedBy: "2024/05/26",
    location: "Well 2dsf",
    description:
      "Whatever the note is I just have to make this a two-line stuff to show the case of multiple lines at all...",
  },
  {
    date: "25/07/2024",
    time: "10:00 AM",
    reportedBy: "2024/05/26",
    location: "Well 2dsf",
    description:
      "Whatever the note is I just have to make this a two-line stuff to show the case of multiple lines at all...",
  },
  {
    date: "25/07/2024",
    time: "10:00 AM",
    reportedBy: "2024/05/26",
    location: "Well 2dsf",
    description:
      "Whatever the note is I just have to make this a two-line stuff to show the case of multiple lines at all...",
  },
  {
    date: "25/07/2024",
    time: "10:00 AM",
    reportedBy: "2024/05/26",
    location: "Well 2dsf",
    description:
      "Whatever the note is I just have to make this a two-line stuff to show the case of multiple lines at all...",
  },
];
