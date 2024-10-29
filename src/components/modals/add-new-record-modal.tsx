"use client";

import { ModalProps } from "@/types";
import { FC, useState } from "react";
import { ModalWrapper } from "./modal-wrapper";
import { useForm } from "react-hook-form";
import { ModalInput } from "../inputs";
import { IoAddCircleOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { createRecord, getDataTypeNameByUser, getWells } from "@/server";
import { toast } from "react-toastify";

export const AddNewRecordModal: FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const { control, handleSubmit } = useForm<FormValues>();

  const [additionalFields, setAdditionalFields] = useState<
    { dataTypeName: string; value: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const dataTypeResponseByUser = useQuery({
    queryKey: ["dataTypeResponseByUser"],
    queryFn: () => getDataTypeNameByUser(),
  });

  const wellsData = useQuery({
    queryKey: ["wellsDataClient"],
    queryFn: () => getWells(),
  });

  const formattedDataTypeResponseByUser = dataTypeResponseByUser.data
    ? "error" in dataTypeResponseByUser.data
      ? []
      : dataTypeResponseByUser.data.data.data.map((dataType) => ({
          label: dataType,
          value: dataType,
        }))
    : [];

  const formattedWellsData = wellsData.data
    ? wellsData.data.data.data.wells.map((well) => ({
        label: well.name,
        value: well.id,
      }))
    : [];

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { dataTypeName: "", value: "" }]);
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    const response = await createRecord(
      data.date,
      data.time,
      data.well,
      data.additionalFields
    ).finally(() => setIsLoading(false));

    if ("error" in response) {
      toast.error(response.error);
    } else {
      toast.info(response.message || "Record Added Successfully");
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;
  return (
    <ModalWrapper
      handleSave={handleSubmit(onSubmit)}
      title="Add New Record"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isPending={isLoading}
    >
      <div className="h-full max-h-[50vh] overflow-y-auto">
        <div className="grid h-full grid-cols-2 gap-x-4 gap-y-2">
          {RecordData.map((field, idx) => (
            <div
              key={idx}
              className={`w-full ${idx === 1 || idx === 0 ? "col-span-1" : "col-span-2"} `}
            >
              <ModalInput
                control={control}
                name={field.name as keyof FormValues}
                label={field.label}
              />
            </div>
          ))}

          <div className={`col-span-2 w-full`}>
            <ModalInput
              control={control}
              name={"well"}
              type="select"
              label={"Select Well IDs"}
              options={formattedWellsData}
            />
          </div>

          {additionalFields.map((field, idx) => (
            <div
              key={idx}
              className="col-span-2 flex w-full items-center justify-between gap-4"
            >
              <ModalInput
                control={control}
                name={
                  `additionalFields[${idx}].dataTypeName` as keyof FormValues
                }
                label="Data Name"
                type="select"
                options={formattedDataTypeResponseByUser}
              />

              <ModalInput
                control={control}
                name={`additionalFields[${idx}].value` as keyof FormValues}
                label="Enter Value"
              />
            </div>
          ))}
        </div>

        <div className="mt-[10px] flex w-full justify-center">
          <button onClick={handleAddField}>
            <IoAddCircleOutline size={28} color="#A2A2A2" />
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

interface FormValues {
  date: string;
  time: string;
  well: string;
  additionalFields: { dataTypeName: string; value: string }[];
}

const RecordData = [
  {
    label: "Date (2024-03-22)",
    name: "date",
  },
  {
    label: "Time (12:00)",
    name: "time",
  },
  // {
  //   label: "Well ID",
  //   name: "well",
  // },
];
