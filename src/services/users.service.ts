import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Injectable()
export class UsersService {
  constructor(private readonly kafkaService: KafkaService) {}

  async createUser(data: any) {
    await this.kafkaService.publish('users.intake', { userCreated: data });
  }
  
}
