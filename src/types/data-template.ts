interface FlowData {
  flowDataName: string;
}

export interface DataTemplate {
  message: string;
  data: FlowData[];
}

interface CompDataItem {
  compDataName: string;  
  flowDataName: string; 
}

export interface CompDataResponse {
  compData: CompDataItem[];
}