export interface ReportsData {
  id: string;
  title: string;
  description: string;
  level: string;  
  wellId: string;
  status: string; 
  user_id: string;
  createdAt: string; 
  updatedAt: string; 
  type: "ALERT" | "NOTIFICATION"
}

export interface ReportsResponse {
  message: string;
  data: ReportsData[];
}

export interface SessionDataResponse {
  message: string;
  data: {
    resolvedPercentage: string;
    unresolvedPercentage: string;
  };
}
