import { Controller, Post, Body } from '@nestjs/common';
import { KafkaService } from 'src/services/kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('send')
  async sendMessage(@Body() body: { topic: string; message: any }) {
    await this.kafkaService.publish(body.topic, body.message);
    return { status: 'Message sent' };
  }
}
