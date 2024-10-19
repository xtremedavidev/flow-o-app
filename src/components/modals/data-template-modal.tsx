"use client";

import { FC, useEffect, useState } from "react";
import { ModalWrapper } from "./modal-wrapper";
import { toast } from "react-toastify";
import { DataTemplate } from "@/types";
import { ModalInput } from "../inputs";
import { useForm } from "react-hook-form";
import { cn } from "@/utils";
// import { IoAddCircleOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { saveDataTemplate } from "@/server";
import { useRouter } from "next/navigation";

interface DataTemplateModalProps {
  flowTempData: DataTemplate | { error: string };
}

interface FormValues {
  [key: string]: string;
}

export const DataTemplateModal: FC<DataTemplateModalProps> = ({
  flowTempData,
}) => {
  const defaultValues =
    flowTempData && !("error" in flowTempData)
      ? flowTempData.data.reduce((acc, tempData) => {
          acc[tempData.flowDataName] = "";
          return acc;
        }, {} as FormValues)
      : {};

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  // const [additionalFields, setAdditionalFields] = useState<string[]>([""]);

  // const handleAddField = () => {
  //   setAdditionalFields([...additionalFields, ""]);
  // };

  const mutation = useMutation({
    mutationFn: (compData: {
      compData: { compDataName: string; flowDataName: string }[];
    }) => saveDataTemplate(compData),
    // onSuccess: () => {

    // },
    onError: (error) => {
      toast.error(error.message as string);
    },
  });

  const onSubmit = async (data: FormValues) => {
    // console.log("Form data:", data);

    const CompDataType = {
      compData:
        "error" in flowTempData
          ? []
          : flowTempData.data.map((tempData) => {
              return {
                compDataName: data[tempData.flowDataName],
                flowDataName: tempData.flowDataName,
              };
            }),
    };

    console.log("CompDataType", CompDataType);

    if (CompDataType.compData.length > 0) {
      const saveCompDataType = await mutation.mutateAsync(CompDataType);
      console.log("saveCompDataType---->", saveCompDataType);
      if (saveCompDataType.error) {
        toast.error(saveCompDataType.error || "Failed to save data template");
      } else {
        toast.success("Data Template Created Successfully");
        toast.info("You need to login again to effect changes");
        router.replace("/login");
      }
    }
  };

  useEffect(() => {
    if ("error" in flowTempData) {
      toast.error(flowTempData.error);
    }
  }, [flowTempData]);

  return (
    <ModalWrapper
      handleSave={handleSubmit(onSubmit)}
      title="Create Your Data Template"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isPending={mutation.isPending}
      isCloseable={false}
    >
      <ul className="list-disc">
        {listItems.map((item) => (
          <li key={item} className="text-[9px] font-normal text-[#EE4F4F]">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-4 h-full max-h-[40vh] overflow-y-auto pr-2">
        <div>
          <h3 className="mb-2 text-[10px] font-medium">Compulsory Fields:</h3>
          <div className="h-full space-y-2">
            {"error" in flowTempData
              ? null
              : flowTempData.data.map((tempData, idx) => (
                  <div key={idx} className="flex w-full justify-between gap-2">
                    <ModalInput
                      name={tempData.flowDataName}
                      control={control}
                      label={`Enter Record Title`}
                      className="w-full max-w-[50%]"
                    />
                    <CompulsoryFieldsItem
                      text={tempData.flowDataName}
                      className="w-full max-w-[50%]"
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* <div>
          <h3 className="mb-2 mt-4 text-[10px] font-medium">Other Fields:</h3>
          <div className="h-full space-y-2">
            {additionalFields.map((field, idx) => (
              <div key={idx} className="w-full">
                <ModalInput
                  control={control}
                  name={`additionalField${idx}`}
                  label="Enter Record Description"
                />
              </div>
            ))}
          </div>
          <div className="mt-[10px] flex w-full justify-center">
            <button onClick={handleAddField}>
              <IoAddCircleOutline size={28} color="#A2A2A2" />
            </button>
          </div>
        </div> */}
      </div>
    </ModalWrapper>
  );
};

const listItems = [
  "Add your data to match the compulsory fields.",
  "You can add supplementary data list by clicking on Add button.",
  "Entry is CASE SENSITIVE.",
];

interface CompulsoryFieldsItemProps {
  text: string;
  className?: string;
}

const CompulsoryFieldsItem: FC<CompulsoryFieldsItemProps> = ({
  text,
  className,
}) => {
  return (
    <div
      className={cn(
        `w-full rounded-[4px] bg-[#464646]/[0.37] px-3 py-[9.78px] text-[10px] font-medium text-white`,
        className
      )}
    >
      <span>{text}</span>
    </div>
  );
};
