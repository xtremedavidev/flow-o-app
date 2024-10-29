"use client";

interface ToggleItem {
  name: string;
  value: boolean;
}

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
}) => {
  return (
    <div className="relative inline-block h-6 w-12">
      <div
        className={`absolute inset-0 cursor-pointer rounded-full transition-colors duration-300 ${isOn ? "bg-teal-400" : "bg-gray-300"}`}
        onClick={onToggle}
      />
      <div
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-full bg-white shadow-md transition-transform duration-300 ${isOn ? "translate-x-[28px]" : "translate-x-1"}`}
        onClick={onToggle}
      />
    </div>
  );
};
