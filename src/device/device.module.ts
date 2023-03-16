import { Module } from '@nestjs/common';

import { MobileDeviceController } from './device.controller';
import { MobileDeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileDevice } from './entitiy/mobile_device.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MobileDevice]),
    ],

  controllers: [MobileDeviceController],
  providers: [MobileDeviceService],
})
export class MobileDeviceModule {}