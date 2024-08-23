export const ConditionsItem = ({
  colour,
  status,
}: {
  colour: string;
  status: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{ background: colour }}
        className="flex h-[9px] w-[9px] shrink-0 rounded-full"
      />
      <span className="text-sm font-normal">{status}</span>
    </div>
  );
};
