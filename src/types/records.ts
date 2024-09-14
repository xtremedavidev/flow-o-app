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
  type: "ALERT" | "NOTIFICATION";
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

export interface ReportTableHeaderResponse {
  message: string;
  data: {
    flowDataName: string;
  }[];
}

// ---------------------

interface DataRecord {
  id: string;
  dataTypeName: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  recordTypeId: string;
}

interface RecordType {
  id: string;
  typeName: string;
  createdAt: string;
  updatedAt: string;
  recordId: string;
  dataRecords: DataRecord[];
}

interface Data {
  id: string;
  recordTitle: string;
  recordDescription: string;
  time: string;
  iotBondingCode: string;
  date: string;
  user_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  recordTypes: RecordType[];
}

export interface RecordsData {
  message: string;
  data: Data[];
}

// ---------------------------------
export interface RecommendationResponse {
  message: string;
  recommendation: RecommendationItem[];
}

export interface RecommendationItem {
  id: string;
  recommendations: string[];
  question: string;
  createdAt: string;
  updatedAt: string;
  reportId: string;
  report: ReportsData;
}
