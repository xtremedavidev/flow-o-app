import { PageLoader, PageRerouter } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowOptix | Home",
  description: "Home for FlowOptix",
};

export default function Home() {
  return (
    <main>
      <PageRerouter fallback={<PageLoader />} goTo="/dashboard/home" />
    </main>
  );
}
