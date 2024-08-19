"use client";

import React, { FC, forwardRef } from "react";
import { ModalWrapper } from "./modal-wrapper";
import { ModalProps } from "@/types";
import { cn } from "@/utils";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface FormValues {
  deviceName: string;
  deviceBondingCode: string;
  measurementType: string;
  unit: string;
  attachSite: string;
  attachWell: string;
}

const formFields = [
  { name: "deviceName", label: "Device Name", type: "text" },
  { name: "deviceBondingCode", label: "Device Bonding Code", type: "text" },
  {
    name: "measurementType",
    label: "Measurement Type",
    type: "select",
    options: [
      { value: "temperature", label: "Temperature" },
      { value: "pressure", label: "Pressure" },
      { value: "humidity", label: "Humidity" },
    ],
  },
  {
    name: "unit",
    label: "Unit",
    type: "select",
    options: [
      { value: "celsius", label: "Celsius" },
      { value: "fahrenheit", label: "Fahrenheit" },
      { value: "pascal", label: "Pascal" },
    ],
  },
  {
    name: "attachSite",
    label: "Attach Site",
    type: "select",
    options: [
      { value: "siteA", label: "Site A" },
      { value: "siteB", label: "Site B" },
      { value: "siteC", label: "Site C" },
    ],
  },
  {
    name: "attachWell",
    label: "Attach Well",
    type: "select",
    options: [
      { value: "well1", label: "Well 1" },
      { value: "well2", label: "Well 2" },
      { value: "well3", label: "Well 3" },
    ],
  },
];

export const AddNewDeviceModal: FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  if (!isOpen) return null;
  return (
    <ModalWrapper
      handleSave={handleSubmit(onSubmit)}
      title="Add New Device"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="grid grid-cols-2 gap-x-[10px] gap-y-2">
        {formFields.map((field, idx) => (
          <ModalInput
            className={`first:col-span-2 ${idx === 1 && "col-span-2"}`}
            key={field.name}
            // name={field.name as keyof FormValues}
            name={field.name as Path<FormValues>}
            control={control}
            type={field.type}
            label={field.label}
            options={field.options}
          />
        ))}
      </div>
    </ModalWrapper>
  );
};

interface ModalInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  type?: "text" | "select" | "checkbox" | string;
  options?: { value: string; label: string }[];
  className?: string;
  label?: string;
}

const ModalInput = <T extends FieldValues>({
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
        className,
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
                <option value="" disabled>
                  {label}
                </option>
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

// interface ModalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   className?: string;
// }

// const ModalInput = forwardRef<HTMLInputElement, ModalInputProps>(
//   ({ type = "text", className, ...props }, ref) => {
//     return (
//       <div
//         className={cn(
//           `w-full rounded-[4px] bg-[#464646] px-3 py-[10px] text-[10px] font-medium text-white`,
//           className,
//         )}
//       >
//         <input
//           {...props}
//           ref={ref}
//           type={type}
//           className="w-full border-none bg-transparent outline-none ring-transparent"
//         />
//       </div>
//     );
//   },
// );

ModalInput.displayName = "ModalInput";
