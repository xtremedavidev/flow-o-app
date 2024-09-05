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
