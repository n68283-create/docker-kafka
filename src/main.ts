import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      //what is better here?
      client: {
        brokers: [process.env['KAFKA_BROKER'] || (() => { throw new Error('KAFKA_BROKER is required'); })()], 
        //  brokers: [process.env['KAFKA_BROKER'] || 'kafka:9092'],
      },
      consumer: {
        groupId: process.env['KAFKA_GROUP_ID'] || (() => { throw new Error('KAFKA_GROUP_ID is required'); })(),
        //groupId: process.env['KAFKA_GROUP_ID'] || 'my-consumer-group',

      },
    },
  });

  await app.startAllMicroservices();
  app.enableShutdownHooks(); 
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
