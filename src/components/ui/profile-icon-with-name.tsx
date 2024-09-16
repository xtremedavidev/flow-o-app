"use client";

import { useUserStore } from "@/managers";

export const ProfileWName = () => {
  const userData = useUserStore((state) => state.user);

  return (
    <div className="flex items-center gap-2 rounded-[41px] bg-[#353535]/[0.14] px-[14px] py-[10px]">
      <div className="h-[40px] w-[40px] rounded-full bg-white"></div>
      <span className="text-xl font-normal">{userData?.first_name}</span>
    </div>
  );
};
