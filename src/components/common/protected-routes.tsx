"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { PageLoader } from "../loaders";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface ProtectedRouteWrapperProps {
  children: React.ReactNode;
}

export const ProtectedRouteWrapper: FC<ProtectedRouteWrapperProps> = ({
  children,
}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get("token");
      // const token = localStorage.getItem("token");

      if (!token) {
        toast.error(
          "Access Denied: You do not have the necessary permissions to view this page."
        );
        setIsAuthenticated(false);
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, [router]);

  if (isAuthenticated === null) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return null;
  }
};
