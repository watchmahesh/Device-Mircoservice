import { Observable } from 'rxjs';

export interface MobileService {
    getMobileDevice(data?: MobileListRequest): Observable<DeviceListAll>;
    create(data?: CreateRequest): Observable<DeviceDatas>;
    update(data?: UpdateRequest): Observable<DeviceDatas>;
    delete(data: DeviceById): Observable<DeviceSuccessMessage>;
    findById(data: DeviceById): Observable<DeviceDatas>;

}
export interface DeviceListAll {
  data: Array<DeviceDatas>;
}
export interface CreateRequest {
  data: CreateData;
}

export interface DeviceSuccessMessage {
  message: string;
}

export interface DeviceDatas {
  id: number;
  name: string;
  device_id: string;
  os_version: string;
  customer_name:string;
}

export interface MobileListRequest {
  data ?:string;
}

export interface UpdateRequest {
  id:number
  data: CreateData;
}

export interface CreateData {
  name: string;
  device_id: string;
  os_version: string;
  customer_name:string;
}

export interface DeviceById {
  id: number;
}