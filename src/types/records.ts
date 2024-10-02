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

interface User {
    first_name: string;
    last_name: string;
}

interface Well {
    id: string;
    location: string;
    name: string;
    site: string;
    user_id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface Record {
    id: string;
    recordTitle: string;
    recordDescription: string;
    time: string;
    iotBondingCode: string | null;
    date: string;
    user_id: string;
    wellId: string;
    addedBy: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    recordTypes: RecordType[];
    user: User;
    well: Well;
}

export interface RecordsData {
  message: string;
  data: Record[];
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

