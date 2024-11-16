"use client";

import { FC, useEffect, useState } from "react";
import { PageLoader } from "../loaders";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ProtectedRouteWrapperProps {
  children: React.ReactNode;
  token: string | undefined;
}

export const ProtectedRouteWrapper: FC<ProtectedRouteWrapperProps> = ({
  children,
  token,
}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!token || token === "") {
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
  }, [router, token]);

  if (isAuthenticated === false) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return null;
  }
};
