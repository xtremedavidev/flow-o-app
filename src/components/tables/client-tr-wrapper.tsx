"use client";

import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ClientTrWrapperProps {
  pushTo?: string;
  className?: string;
  children: React.ReactNode;
}
export const ClientTrWrapper: FC<ClientTrWrapperProps> = ({
  pushTo,
  className,
  children,
}) => {
  const router = useRouter();

  function handleClick() {
    if (pushTo) {
      router.push(pushTo);
    }
  }

  return (
    <tr className={cn(``, className)} onClick={handleClick}>
      {children}
    </tr>
  );
};
