import { AuthBgWrapper } from "@/components";
import React, { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return <AuthBgWrapper>{children}</AuthBgWrapper>;
};

export default AuthLayout;
