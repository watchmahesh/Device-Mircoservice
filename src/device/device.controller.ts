import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateRequest, DeviceById, DeviceDatas, DeviceListAll, DeviceSuccessMessage, UpdateRequest } from 'src/common/interface/mobile_device';
import { MobileDeviceService } from './device.service';

@Controller()
export class MobileDeviceController {
  private readonly logger = new Logger(MobileDeviceController.name);
  constructor(private readonly mobileDeviceService: MobileDeviceService) {}

  @GrpcMethod('MobileService', 'GetMobileDevice')

  async findAllDevices(data:any): Promise<DeviceListAll> {
    try {
        return await this.mobileDeviceService.findAll();
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
   }

   @GrpcMethod('MobileService', 'FindById')
   async findById(data: DeviceById): Promise<DeviceDatas> {
     try {
       return await this.mobileDeviceService.findById(data.id);
     } catch (error) {
       this.logger.error(error.message);
       throw error;
     }
   }

   @GrpcMethod('MobileService', 'Create')
   async create(data: CreateRequest): Promise<DeviceDatas> {
     try {
       return await this.mobileDeviceService.create( data);
     } catch (error) {
       this.logger.error(error.message);
       throw error;
     }
   }

   @GrpcMethod('MobileService', 'Update')
   async update(data: UpdateRequest): Promise<DeviceDatas> {
     try {
       return await this.mobileDeviceService.update(data);
     } catch (error) {
       this.logger.error(error.message);
       throw error;
     }
   }

   @GrpcMethod('MobileService', 'Delete')
   async delete(data: DeviceById): Promise<DeviceSuccessMessage> {
     try {
       return await this.mobileDeviceService.delete(data.id);
     } catch (error) {
       this.logger.error(error.message);
       throw error;
     }
   }

}