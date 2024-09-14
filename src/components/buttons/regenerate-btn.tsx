"use client";
import { FC, useState } from "react";
import { RefreshIcon } from "../icons";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { decryptToken, fetcher } from "@/utils";
import { RecommendationResponse } from "@/types";
import { revalidatePath } from "next/cache";

interface RegenerateBtnProps {
  // handleRenerate: () => Promise<void>;
  alertID: string;
}

export const RegenerateBtn: FC<RegenerateBtnProps> = ({ alertID }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function getRecommendations(id: string) {
    setIsLoading(true);
    const token = Cookies.get("token");
    const decryptedToken = token
      ? decryptToken(decodeURIComponent(token))
      : undefined;

    if (!decryptedToken) {
      throw new Error("Session expired. Please login again");
    }

    const recommendationData = await fetcher<RecommendationResponse>(
      `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-recommendations`,
      {
        method: "POST",
        data: { reportId: id },
        token: decryptedToken,
      }
    );

    if (!recommendationData) {
      throw new Error("Failed to fetch recommendation data");
    }

    // return recommendationData;
  }

  const mutation = useMutation({
    mutationFn: (id: string) => getRecommendations(id),
    onSuccess: () => {
      setIsLoading(false);
      revalidatePath(`/action-center/[alertID]`, "page");
    },
  });

  return (
    <button
      onClick={() => mutation.mutate(alertID)}
      className={`flex w-fit items-center gap-3 rounded-[38px] bg-[#2251F8]/[0.15] px-[18px] py-2 text-xs font-normal text-[#3984F3]`}
    >
      {!isLoading && <span>Regenerate</span>}
      <span className={`${isLoading && "animate-spin"}`}>
        <RefreshIcon />
      </span>
    </button>
  );
};
