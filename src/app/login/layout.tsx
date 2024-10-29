import { AuthBgWrapper } from "@/components";
import { Metadata } from "next";
import React, { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "FlowOptix | Authentication",
  description: "Authentication for FlowOptix",
};

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return <AuthBgWrapper>{children}</AuthBgWrapper>;
};

export default AuthLayout;
