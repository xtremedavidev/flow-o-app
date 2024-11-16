"use server";

import { GeneralInsightsAPIResponse } from "@/hooks";
import {
  CreateRecordResponse,
  DefaultResponse,
  DevicesDataResp,
  GetMultipleSitesResponse,
  GetSingleSiteResponse,
  GetSiteResponse,
  RecommendationResponse,
  RecordsData,
  SendChatMsgResponse,
  SitesResponse,
  WellsResponse,
} from "@/types";
import { decryptToken, encryptToken, fetcher, FetcherResult } from "@/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

export async function getDashboardCardData() {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const wellsDataPromise = fetcher<WellsResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/well-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

  const devicesDataPromise = fetcher<DevicesDataResp>(
    `${process.env.NEXT_PUBLIC_BASEURL}/iot-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

  const sitesDataPromise = fetcher<SitesResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/site-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

  const [wellsData, devicesData, sitesData] = await Promise.all([
    wellsDataPromise,
    devicesDataPromise,
    sitesDataPromise,
  ]);

  if (wellsData.error) {
    return{error: "Failed to fetch wells data"};
  }

  if (devicesData.error) {
    return{error: "Failed to fetch devices data"};
  }

  if (sitesData.error) {
    return{error: "Failed to fetch sites data"};
  }

  return { wellsData, devicesData, sitesData };
}

export async function getRecords() {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const recordsData = await fetcher<RecordsData>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get`,
    {
      method: "POST",
      data: {},
      token: decryptedToken,
    }
  );

  if (!recordsData) {
    return{error: "Failed to fetch reports data"}
  }

  return recordsData;
}

export async function getGeneralInsightsChartData(wellID: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const generalInsightsChartData = await fetcher<GeneralInsightsAPIResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-graph-data`,
    {
      method: "POST",
      data: {
        well: wellID,
        startDate: "2020-08-19",
        endDate: formattedDate,
      },
      token: decryptedToken,
    }
  );

  if (!generalInsightsChartData) {
    return{error:"Failed to fetch reports data"}
  }

  return generalInsightsChartData;
}

export async function handleResolve(id: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const decryptedID = decryptToken(decodeURIComponent(id));

  const res = await fetcher<{ message: string }>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/resolve-report`,
    {
      method: "POST",
      data: { reportId: decryptedID },
      token: decryptedToken,
    }
  );

  console.log("resolved---------------->", res);

  revalidatePath("/");
  revalidatePath("/action-center");
  return res;
}

export const getRecommendations = async (id: string) => {
  const token = cookies().get("token")?.value;

  const resp = unstable_cache(
    async () => {
      const decryptedToken = token
        ? decryptToken(decodeURIComponent(token))
        : undefined;

      const recommendationData = await fetcher<RecommendationResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-recommendations`,
        {
          method: "POST",
          data: { reportId: id },
          token: decryptedToken,
        }
      );

      if (!recommendationData) {
        return{error:"Failed to fetch recommendation data"};
      }

      return recommendationData;
    },
    undefined,
    {
      tags: ["getRecommendationsTag"],
    }
  );

  const data = await resp();
  return data;
};

export async function getRecommendationsChat(id: string, question: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const recommendationChatData = await fetcher<RecommendationResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/send-question-recommendation-chat`,
    {
      method: "POST",
      data: { question: question, reportId: id },
      token: decryptedToken,
    }
  );

  if (!recommendationChatData) {
    return{error:"Failed to fetch recommendation chat data"}
  }

  return recommendationChatData;
}

export async function getSites(
  id: string
): Promise<FetcherResult<GetSingleSiteResponse>>;
export async function getSites(
  id?: undefined
): Promise<FetcherResult<GetMultipleSitesResponse>>;

export async function getSites(
  id?: string
): Promise<FetcherResult<GetSiteResponse<typeof id>>> {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const sitesData = await fetcher<GetSiteResponse<typeof id>>(
    `${process.env.NEXT_PUBLIC_BASEURL}/site-gateway/get`,
    {
      method: "POST",
      data: { id },
      token: decryptedToken,
    }
  );

  if (sitesData.error || !sitesData) {
    // throw new Error("Failed to fetch sites data");
    return {data: null as unknown as GetSiteResponse<typeof id>, error: "Failed to fetch sites data"}
  }

  return sitesData;
}

export async function getWells(id?: string, siteId?: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const wellsData = await fetcher<WellsResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/well-gateway/get`,
    {
      method: "POST",
      data: { id, siteId },
      token: decryptedToken,
    }
  );

  if (!wellsData) {
    return{error: "Failed to fetch wells data"};
  }

  return wellsData;
}

export async function getDevices(id?: string, wellId?: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const devicesData = await fetcher<DevicesDataResp>(
    `${process.env.NEXT_PUBLIC_BASEURL}/iot-gateway/get`,
    {
      method: "POST",
      data: { id, wellId },
      token: decryptedToken,
    }
  );

  if (!devicesData) {
    return{error:"Failed to fetch devices data"}
  }

  return devicesData;
}

export async function createNote(text: string, deviceID: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const noteData = await fetcher<{ message: string }>(
    ` ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/create-note`,
    {
      method: "POST",
      data: { note: text, iotId: deviceID },
      token: decryptedToken,
    }
  );

  if (!noteData) {
    return {error:"Failed to create note"}
  }

  return noteData;
}

interface LoginResponse extends DefaultResponse {
  token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    onBoardingDone: boolean;
    companyName: string;
    companyLocation: string;
    image: string;
  };
}

export async function handleLogin(
  identifier: string,
  password: string,
  rememberMe: boolean
) {
  const loginData = await fetcher<LoginResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/user-gateway/login`,
    {
      method: "POST",
      data: { identifier, password },
    }
  );

  if (loginData?.data?.message !== "success") {
    return { error: loginData?.data?.message || loginData.error };
  }

  const encryptedToken = encodeURIComponent(encryptToken(loginData.data.token));

  const cookieOptions: any = {
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  if (rememberMe) {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);
    cookieOptions.expires = expiresDate;
  }

  await cookies().set("token", encryptedToken, cookieOptions);
  localStorage.setItem("token", encryptedToken)

  return { loginData: loginData.data };
}

export async function saveDataTemplate(compData: {
  compData: { compDataName: string; flowDataName: string }[];
}) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const flowDataTemp = await fetcher<{
    data: unknown;
    error: string;
  }>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/save-company-data-type`,
    {
      method: "POST",
      data: { compData: compData.compData },
      token: decryptedToken,
    }
  );

  if (flowDataTemp.error) {
    return { error: flowDataTemp.error };
  }

  return flowDataTemp.data;
}

export async function sendChatbotMsg(message: string) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const sendMsgResp = await fetcher<SendChatMsgResponse>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/send-chat`,
    {
      method: "POST",
      data: { message },
      token: decryptedToken,
    }
  );

  if (sendMsgResp.error) {
    return { error: sendMsgResp.error };
  }

  return sendMsgResp.data;
}

export async function updateUserSettingsObj(formData: FormData) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const updatedUserSettings = await fetcher<{message: string}>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/user-gateway/update-user`,
    {
      method: "POST",
      data: formData,
      token: decryptedToken,
    }
  );

  if (updatedUserSettings.error) {
    return { error: updatedUserSettings.error };
  }

  return updatedUserSettings.data;
}

export async function createRecord(date: string, time: string, wellId: string, dataTypeName: {dataTypeName: string, value: string}[]) {
  const token = cookies().get("token")?.value;
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

    const DataObj = {
  recordTitle: "Flowback Data Record",
  recordDescription: "",
  time: time,
  date: date,
  well: wellId,
  recordTypes: [
    {
      typeName: "High Stage",
      dataTypes: dataTypeName
    }]
    
    }

    // console.log("testing resp obj");
    

  const recordData = await fetcher<
    CreateRecordResponse
  >(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/create`,
    {
      method: "POST",
      data: DataObj,
      token: decryptedToken,
    }
  );

  if (recordData.error) {
    return { error: recordData.error };
  }

  revalidatePath("/home")
  return recordData.data;
}