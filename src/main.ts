import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'], // תואם ל-ADVERTISED_LISTENERS
      },
      consumer: {
        groupId: 'my-consumer-group',
        // allowAutoTopicCreation: true, // אופציונלי
      },
    },
  });
  await app.startAllMicroservices();
  app.enableShutdownHooks(); // ← מוסיף סגירה נקייה לצרכן
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();