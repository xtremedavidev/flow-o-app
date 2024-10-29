export interface Site {
  id: string;
  location: string;
  name: string;
  user_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SitesResponse {
  message: string;
  data: Site[];
}

interface GetSiteResponseBase {
  message: string;
}

export interface GetSingleSiteResponse extends GetSiteResponseBase {
  data: Site;
}

export interface GetMultipleSitesResponse extends GetSiteResponseBase {
  data: Site[];
}

export type GetSiteResponse<T extends string | undefined> = T extends string
  ? GetSingleSiteResponse
  : GetMultipleSitesResponse;
