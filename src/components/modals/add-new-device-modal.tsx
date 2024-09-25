"use client";

import React, { FC } from "react";
import { ModalWrapper } from "./modal-wrapper";
import { GetMultipleSitesResponse, ModalProps, WellsResponse } from "@/types";
import { decryptToken, fetcher, FetcherResult } from "@/utils";
import { Path, SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getSites, getWells } from "@/actions";
import { ModalInput } from "../inputs";

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

  const fields = formFields(sitesOptions, wellOptions);

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
        {fields.map((field, idx) => (
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

const formFields = (
  sitesOptions: UseQueryResult<FetcherResult<GetMultipleSitesResponse>, Error>,
  wellOptions: UseQueryResult<FetcherResult<WellsResponse>, Error>
) => [
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
