"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaAngleLeft } from "react-icons/fa6";

interface BackBtnWithTextProps {
  text: string;
}

export const BackBtnWithText: FC<BackBtnWithTextProps> = ({ text }) => {
  const router = useRouter();

  return (
    <button className="flex items-center gap-4">
      <FaAngleLeft size={16} color="#ffffff" onClick={() => router.back()} />
      <span className="text-2xl font-semibold">{text}</span>
    </button>
  );
};
