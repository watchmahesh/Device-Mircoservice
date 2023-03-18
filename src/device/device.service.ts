import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRequest, DeviceDatas, DeviceListAll, DeviceSuccessMessage, UpdateRequest } from 'src/common/interface/mobile_device';
import { DataSource, Repository } from 'typeorm';
import { MobileDevice } from './entitiy/mobile_device.entity';
import { Controller, UseInterceptors, Logger } from '@nestjs/common';

@Injectable()
export class MobileDeviceService {
  private readonly logger = new Logger(MobileDeviceService.name);
  constructor(
    @InjectRepository(MobileDevice)
    private readonly repo: Repository<MobileDevice>,
    private dataSource: DataSource,

  ) {}


  async findAll(query?: any): Promise<DeviceListAll> {
    try {

      const [result] = await this.repo.findAndCount({
      });
      const resultData= result.map( item => {
        return  this.makeResponseData(item);
       });
      return { data: resultData };
    } catch (error) {
      this.logger.error(this.findAll.name,error);
      throw error;
    }
  }

  async findById(id: number): Promise<DeviceDatas> {
    try {
      const response = await this.repo.findOne({where:{id:id}});
      if (!response) {
        throw new NotFoundException('Data Not Found');
      }
      return  this.makeResponseData(response);
    } catch (error) {
      this.logger.error(this.findById.name,error);
      throw error;
    }
  }

  async create( data:CreateRequest ): Promise<any> {
    try {
      const insertedData = await this.saveData( data);
      return insertedData;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(data: UpdateRequest): Promise<any> {
    try {
      const response = await this.repo.findOneBy({
        id: data.id,
      });

      if (!response) {
        throw new NotFoundException('Data Not found');
      }

      await this.updateData(response, data);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async delete(id: number): Promise<DeviceSuccessMessage> {
    try {
      const response = await this.repo.findOneBy({ id: id });
      if (!response) {
        throw new NotFoundException('Device Not found');
      }
      await this.repo.delete({ id: response.id });
      return {
        message: 'Successfully Deleted',
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }


  async saveData(data) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const responseData = this.repo.create({
        device_id: data.data.device_id ,
        name:data.data.name,
        os_version:data.data.os_version ,
        customer_name: data.data.customer_name,
      });
      await queryRunner.manager.save(responseData);
      await queryRunner.commitTransaction();
      return responseData;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateData(response, data) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(MobileDevice,{id: response.id},{...data.data,});
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  makeResponseData(deviceData){
    return {
      ...deviceData,

    }
  }


}