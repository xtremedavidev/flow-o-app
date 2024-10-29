"use client";

import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AddNewDeviceModal } from "../modals";

export const AddDeviceButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-[6px] rounded-[10px] bg-[#297FB8] px-4 py-[9.5px] text-xs font-medium"
      >
        <IoMdAddCircleOutline size={18} color="#ffffff" />
        <span>Add a device</span>
      </button>
      {openModal && (
        <AddNewDeviceModal isOpen={openModal} setIsOpen={setOpenModal} />
      )}
    </>
  );
};
