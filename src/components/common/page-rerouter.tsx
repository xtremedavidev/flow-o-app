"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface PageRerouterProps {
  fallback: React.ReactNode;
  goTo: string;
}

export const PageRerouter: FC<PageRerouterProps> = ({ fallback, goTo }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(goTo);
  }, [goTo]);

  return <div>{fallback}</div>;
};
