import { fetcher } from "@/utils";
import { useMutation } from "@tanstack/react-query";


interface Record {
  x: string;
  y: string;
  dataTypeName: string;
  date: string;
}

interface GeneralInsightsAPIResponse {
  message: string;
  data: Record[];
}

interface FetchGeneralInsightsParams {
  data: {
    well: string;
    startDate?: string;
    endDate?: string;
  };
  token: string | null;
}


export const useFetchGeneralInsights = ({
  data,
  token,
}: FetchGeneralInsightsParams) => {
  if (!token) {
    throw new Error("Token is required");
  }
  return useMutation<GeneralInsightsAPIResponse>({
    mutationFn: () => {
      return fetcher<GeneralInsightsAPIResponse>(
        `${process.env.NEXT_PUBLIC_BASEURL}/record-gateway/get-graph-data`,
        {
          method: "POST",
          data,
          config: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        },
      );
    },
  });
};

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

