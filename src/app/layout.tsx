import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProviderQueryclient } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-[#202020] text-white`}>
        <ToastContainer position="top-center" className={"z-[99999]"} />
        <ProviderQueryclient>{children}</ProviderQueryclient>
      </body>
    </html>
  );
}
