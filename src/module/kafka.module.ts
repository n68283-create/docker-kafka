import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaController } from 'src/conrrollers/kafka.controller';
import { KafkaService } from 'src/services/kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env['KAFKA_BROKER'] || (() => { throw new Error('KAFKA_BROKER is required'); })()],
          },
          consumer: {
            groupId: process.env['KAFKA_GROUP_ID'] || (() => { throw new Error('KAFKA_GROUP_ID is required'); })(),
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  controllers: [KafkaController],
  exports: [KafkaService],
})
export class KafkaModule {}
