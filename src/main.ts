import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'mobile_device',
      protoPath: join(__dirname, '/common/proto/mobile_device.proto'),
      url: `localhost:3001`,
      loader: { keepCase: true },

    },
  });

  await app.startAllMicroservices();
  await app.init();
  Logger.log(
    `\x1B[33m[Microservices]\x1B[39m is running on: \x1B[33m""\x1B[39m`
  );
}
bootstrap().catch((err) => {
  Logger.error('Error loading application', err);
});