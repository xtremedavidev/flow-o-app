"use client";

import { useUserStore } from "@/managers";
import Image from "next/image";

export const ProfileWName = () => {
  const userData = useUserStore((state) => state.user);

  return (
    <div className="flex items-center gap-2 rounded-[41px] bg-[#353535]/[0.14] px-[14px] py-[10px]">
      <div className="aspect-square h-[40px] w-[40px] overflow-hidden rounded-full">
        <Image
          width={40}
          height={40}
          alt="profile pic"
          src={userData?.image || `/images/placeholder-profile-pic.png`}
          className="aspect-square h-[40px] w-[40px] rounded-full object-cover object-center"
        />
      </div>
      <span className="text-xl font-normal">{userData?.first_name}</span>
    </div>
  );
};
