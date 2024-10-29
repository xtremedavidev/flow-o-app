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


export interface DataTypeResponseByUser {
  message: string;
  data: string[];
}


const DATA_TYPE_NAMES = [
  "Cumulative Flow",
  "Time Flow",
  "Temperature",
  "Casing Pressure",
  "Choke Size",
  "Flow Line Velocity",
  "Pipeline Pressure",
  "Pipeline Temperature",
  "Gas Destination",
  "Total Gas Flared",
  "Total Gas to Pipeline",
  "Liquid Gas Ratio (LGR)",
  "Total Gas Pipeline (Net)",
  "Load Left to Recover (LTR)",
  "Oil Gain",
  "Oil Rate",
  "Cumulative Oil",
  "Water Gain",
  "Water Rate",
  "Cumulative Water",
  "Water Salinity",
  "pH Level",
  "LF Recovered",
  "Water Produced",
  "Basic Sediment and Water (BSW)",
  "H2S Level",
  "Sand Cut",
  "Cumulative Sand",
  "Cumulative Water (No Sand)",
  "Water Rate (No Sand)",
  "Static Pressure",
  "Temperature Differential Pressure",
  "In Service Flow Rate",
  "Cumulative Production",
] as const;

export type ConstDataTypeName = typeof DATA_TYPE_NAMES;


export interface CreateRecordResponse {
  message: string;
  data: CreateRecordData;
}

interface CreateRecordData {
  addedBy: string;
  createdAt: string;
  date: string;
  id: string;
  iotBondingCode: string | null;
  recordDescription: string;
  recordTitle: string;
  status: string;
  time: string;
  updatedAt: string;
  user_id: string;
  wellId: string;
}
