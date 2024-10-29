"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

export const BackArrowButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <FaChevronLeft
      size={16}
      color="#ffffff"
      onClick={handleBack}
      className="cursor-pointer"
    />
  );
};
