import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProviderQueryclient } from "@/utils";
import { Inter } from "@/fonts";

export const metadata: Metadata = {
  title: "FlowOptix",
  description: "",
  icons: {
    icon: "/images/flowoptix-logo-big.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Inter.variable} font-inter bg-[#202020] text-white`}>
        <ToastContainer position="top-center" className={"z-[99999]"} />
        <ProviderQueryclient>{children}</ProviderQueryclient>
      </body>
    </html>
  );
}
