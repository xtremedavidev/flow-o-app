"use server"

import { decryptToken, fetcher, getCookiesFromServer } from "@/utils";
import {
  DataTemplate,
  DataTypeResponseByUser,
  EnvTopicsAndTagsResp,
  GetNotesResponse,
  ReportsResponse,
  ReportTableHeaderResponse,
  SessionDataResponse,
  SystemEfficiency,
  WellActivityChartResp,
} from "@/types";
import { redirect } from "next/navigation";

function NoTokenFound() {
  return { error: "No token found" };
}

export async function getReportsDataSF(): Promise<
  ReportsResponse | { error: string }
> {
  const token = await getCookiesFromServer();

  if (!token) {
    NoTokenFound();
    redirect("/login");
  }

  const decryptedToken = decryptToken(decodeURIComponent(token));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-reports`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch reports data:", res.statusText);
    return { error: `Failed to fetch reports data` };
  }

  const data: ReportsResponse = await res.json();
  return data;
}

export async function getSessionDataSF(): Promise<
  SessionDataResponse | { error: string }
> {
  const token = await getCookiesFromServer();

  if (!token) {
    NoTokenFound();
    redirect("/login");
  }

  const decryptedToken = decryptToken(decodeURIComponent(token));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-session-data`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch session data:", res.statusText);
    return { error: `Failed to fetch session data` };
  }

  const data: SessionDataResponse = await res.json();
  return data;
}

export async function getRightbarData() {
  const [sessionData, reportsData] = await Promise.all([
    getSessionDataSF(),
    getReportsDataSF(),
  ]);

  return { sessionData, reportsData };
}

export async function getTableHeaderForReportData() {
  const token = await getCookiesFromServer();
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const reportTableHeaderData = await fetcher<ReportTableHeaderResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-flow-datas`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
    }
  );

 
  if (reportTableHeaderData.error) {
    return { error: reportTableHeaderData.error };
  }

  return reportTableHeaderData;
}

export const getNotes = async (deviceID: string) => {
  const token = await getCookiesFromServer();

  const resp = async function () {
    const decryptedToken = token
      ? decryptToken(decodeURIComponent(token))
      : undefined;

    const notesData = await fetcher<GetNotesResponse>(
      `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-notes`,
      {
        method: "GET",
        data: { iotId: deviceID },
        token: decryptedToken,
      }
    );


    return notesData;
  };

  const data = await resp();

  if (data.error) {
    return { error: data.error };
  }

  return data;
};

export async function getSystemEfficiency(wellId: string) {
  const token = await getCookiesFromServer();
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const sysEffData = await fetcher<SystemEfficiency>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-system-efficiency`,
    {
      method: "GET",
      data: { wellId },
      token: decryptedToken,
    }
  );

  if (sysEffData.error) {
    return { error: sysEffData.error };
  }

  return sysEffData.data;
}

export async function getDataTemplate() {
  const token = await getCookiesFromServer();
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const flowDataTemp = await fetcher<DataTemplate>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-flow-datas`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
    }
  );

  if (flowDataTemp.error) {
    return { error: flowDataTemp.error };
  }

  return flowDataTemp.data;
}



export async function getWellActivityChart() {
  const token = await getCookiesFromServer();
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const wellActivityChart = await fetcher<WellActivityChartResp[]>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/well-gateway/well-activity-graph`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
    }
  );

  if (wellActivityChart.error) {
    return { error: wellActivityChart.error };
  }

  return wellActivityChart;
}

export async function getEnvTopicsTags() {
  const token = await getCookiesFromServer();
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const envTopicsAndTags = await fetcher<EnvTopicsAndTagsResp>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-topics-tags`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
    }
  );

  if (envTopicsAndTags.error) {
    return { error: envTopicsAndTags.error };
  }

  return envTopicsAndTags;
}


export async function getTotalSystemEff() {
  const token = await getCookiesFromServer();
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;


  const totalSysEff = await fetcher<SystemEfficiency>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-total-system-efficiency`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
    }
  );

  if (totalSysEff.error) {
    return { error: totalSysEff.error };
  }

  return totalSysEff;
}

export async function getDataTypeNameByUser() {
  const token = await getCookiesFromServer();
  const decryptedToken = token
    ? decryptToken(decodeURIComponent(token))
    : undefined;

  const userDataTypes = await fetcher<DataTypeResponseByUser>(
    `
    ${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-all-data-type-name-by-user`,
    {
      method: "GET",
      data: {},
      token: decryptedToken,
    }
  );

  if (userDataTypes.error) {
    return { error: userDataTypes.error };
  }

  return userDataTypes;
}
