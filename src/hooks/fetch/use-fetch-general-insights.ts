import { fetcher } from "@/utils";
import { useMutation } from "@tanstack/react-query";


export interface GeneralInsightsData {
  x: string;
  y: string;
  dataTypeName: string;
  date: string;
}

export interface GeneralInsightsAPIResponse {
  message: string;
  data: GeneralInsightsData[];
}

interface FetchGeneralInsightsParams {
  data: {
    well: string;
    startDate?: string;
    endDate?: string;
  };
  token: string | null;
}


// export const useFetchGeneralInsights = ({
//   data,
//   token,
// }: FetchGeneralInsightsParams) => {
//   if (!token) {
//     throw new Error("Token is required");
//   }
//   return useMutation<GeneralInsightsAPIResponse>({
//     mutationFn: () => {
//       return fetcher<GeneralInsightsAPIResponse>(
//         `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-graph-data`,
//         {
//           method: "POST",
//           data,
//           token
//         },
//       );
//     },
//   });
// };

// export const useFetchGeneralInsights = ({
//   data,
//   token,
// }: FetchGeneralInsightsParams) => {
//   if (!token) {
//     throw new Error("Token is required");
//   }

//   return useMutation<GeneralInsightsAPIResponse>({
//     mutationFn: async () => {
//       const response = await axios.post<GeneralInsightsAPIResponse>(
//         `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-graph-data`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       console.log("response--------------", response);
      
//       return response.data;
//     },
//   });
// };

