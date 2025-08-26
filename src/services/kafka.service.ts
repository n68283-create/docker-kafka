import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly logger = new Logger(KafkaService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.client.connect();
    this.logger.log('Kafka producer connected');
  }
  
    async onApplicationShutdown() {
    await this.client.close();
    this.logger.log('Kafka producer disconnected');
  }

  async publish(topic: string, message: unknown): Promise<void> {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        await lastValueFrom(this.client.emit(topic, message));
        this.logger.log(`Message published to ${topic}: ${JSON.stringify(message)}`);
        return;
      } catch (err) {
        attempt++;
        this.logger.error(`Failed to publish message to ${topic} (attempt ${attempt}): ${err.message}`);
        if (attempt >= maxRetries) {
          throw new Error(`Could not publish message to ${topic} after ${maxRetries} attempts`);
        }
        await new Promise(res => setTimeout(res, 500 * attempt));
      }
    }
  }
}
