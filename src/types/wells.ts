export interface Well {
  id: string;
  location: string;
  name: string;
  site: string;
  user_id: string;
  status: 'ACTIVE' | 'INACTIVE'; 
  createdAt: string; 
  updatedAt: string; 
}

interface WellsData {
  totalWell: number;
  activeWell: number;
  wells: Well[];
}

export interface WellsResponse {
  message: string;
  data: WellsData;
}
