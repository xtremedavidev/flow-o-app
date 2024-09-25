import { cn } from "@/utils";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ModalInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  type?: "text" | "select" | "checkbox" | string;
  options?: { value: string; label: string }[];
  className?: string;
  label?: string;
}

export const ModalInput = <T extends FieldValues>({
  name,
  control,
  type = "text",
  options = [],
  className,
  label,
  ...props
}: ModalInputProps<T>) => {
  return (
    <div
      className={cn(
        `w-full rounded-[4px] bg-[#464646] px-3 text-[10px] font-medium text-white`,
        className
      )}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (type === "select") {
            return (
              <select
                {...field}
                className="w-full border-none bg-transparent py-[10px] outline-none ring-transparent"
              >
                <option value="">{label}</option>
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="py-2 text-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            );
          } else if (type === "checkbox") {
            return (
              <div className="flex items-center py-[10px]">
                <input
                  {...field}
                  type="checkbox"
                  className="mr-2"
                  checked={field.value}
                />
                <span className="text-white">{label}</span>
              </div>
            );
          } else {
            return (
              <input
                {...field}
                {...props}
                type={type}
                className="w-full border-none bg-transparent py-[10px] outline-none ring-transparent"
                placeholder={label}
              />
            );
          }
        }}
      />
    </div>
  );
};

ModalInput.displayName = "ModalInput";
