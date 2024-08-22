export const StatusSelect = () => {
  return (
    <select
      name="status"
      id="status"
      className="h-full w-full border-none bg-transparent text-xs font-normal text-white outline-none ring-transparent"
    >
      <option value="" disabled selected>
        Status
      </option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
};
