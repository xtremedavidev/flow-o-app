"use client";

import { useState } from "react";
import { AddNewRecordModal } from "../modals";
import { IoMdAddCircleOutline } from "react-icons/io";

export const AddRecordButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="mb-5 flex w-full justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-[10px] rounded-md bg-[#297FB8] px-3 py-2 text-xs font-medium text-white"
        >
          <IoMdAddCircleOutline size={18} color="#ffffff" />{" "}
          <span>Add Record</span>
        </button>
      </div>
      <AddNewRecordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
