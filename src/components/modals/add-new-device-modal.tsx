"use client";

import React, { FC } from "react";
import { ModalWrapper } from "./modal-wrapper";
import { ModalProps } from "@/types";
import { cn, decryptToken, fetcher } from "@/utils";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { getSites, getWells } from "@/actions";

interface FormValues {
  deviceName: string;
  deviceBondingCode: string;
  measurementType: string;
  // unit: string;
  attachSite: string;
  attachWell: string;
}

interface formattedCreateData {
  deviceName: string;
  bondingCode: string;
  measurementType: string;
  site: string;
  well: string;
  status: string;
}

interface CreateDeviceResponse {
  message: string;
  data: {
    id: string;
    deviceName: string;
    bondingCode: string;
    measurementType: string;
    site: string;
    user_id: string;
    well: string;
    status: string;
    updatedAt: string;
    createdAt: string;
  };
}

export const AddNewDeviceModal: FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const { control, handleSubmit } = useForm<FormValues>();
  const token = Cookies.get("token");
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: {
      formattedData: formattedCreateData;
      token: string | undefined;
    }) => {
      return fetcher<CreateDeviceResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/iot-gateway/create`,
        {
          method: "POST",
          data: data.formattedData,
          token: data.token,
        }
      );
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    const formattedData = {
      deviceName: data.deviceName,
      bondingCode: data.deviceBondingCode,
      measurementType: data.measurementType,
      site: data.attachSite,
      well: data.attachWell,
      status: "ACTIVE",
    };

    console.log("formatted data", formattedData);

    const createDeviceResp = await mutation.mutateAsync({
      formattedData,
      token: decryptedToken,
    });
    if (createDeviceResp.data?.message === "IoT device created successfully") {
      toast.success(createDeviceResp.data?.message);
      setIsOpen(false);
      router.refresh();
    } else {
      toast.error(createDeviceResp.data?.message || "Failed to create device");
    }
  };

  const sitesOptions = useQuery({
    queryKey: ["sites"],
    queryFn: () => getSites(),
  });

  const wellOptions = useQuery({
    queryKey: ["wells"],
    queryFn: () => getWells(),
  });

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
      name: "attachSite",
      label: "Attach Site",
      type: "select",
      options: sitesOptions.data?.data.data.map((site) => ({
        value: site.name,
        label: site.name,
      })),
    },
    {
      name: "attachWell",
      label: "Attach Well",
      type: "select",
      options: wellOptions.data?.data.data.wells.map((well) => ({
        value: well.name,
        label: well.name,
      })),
    },
  ];

  if (!isOpen) return null;
  return (
    <ModalWrapper
      handleSave={handleSubmit(onSubmit)}
      title="Add New Device"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isPending={mutation.isPending}
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
