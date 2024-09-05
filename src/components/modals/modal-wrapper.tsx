"use client";

import { ModalProps } from "@/types";
import React, { FC } from "react";
import ReactDOM from "react-dom";

interface ModalWrapperProps extends ModalProps {
  title: string;
  children: React.ReactNode;
  handleSave?: () => void;
  isPending: boolean;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  isOpen,
  setIsOpen,
  title,
  handleSave,
  children,
  isPending,
}) => {
  function handleModalClose() {
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[70] flex h-screen w-full items-center justify-center bg-black/80 px-[5%] backdrop-blur-md">
      <div className="w-full max-w-[500px] rounded-[26px] bg-[#272727] px-12 py-[22px]">
        <h1 className="mb-4 text-center text-base font-semibold">{title}</h1>
        {children}
        <form
          onSubmit={handleSave}
          className="mt-[21px] flex items-center justify-between gap-3"
        >
          <button
            onClick={handleModalClose}
            className="rounded-[28px] border border-solid border-[#B82932] px-9 py-3 text-xs font-medium text-[#EE4F4F]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`w-full rounded-[28px] bg-[#297FB8] py-3 text-xs font-medium ${isPending ? "animate-pulse" : ""}`}
          >
            {isPending ? "Loading..." : "Save"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};
