
export interface DeviceData {
  id: string;
  deviceName: string;
  bondingCode: string;
  measurementType: string;
  site: string;
  user_id: string;
  well: string;
  status: 'ACTIVE' | 'INACTIVE'; 
  createdAt: string; 
  updatedAt: string; 
}

export interface DeviceDataResp {
  message: string;
  data: DeviceData
}

export interface DevicesDataResp {
  message: string;
  data: {
    totalDevice: number;
    activeDevice: number;
    devices: DeviceData[];
  };
}