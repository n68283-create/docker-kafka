import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka.module';
import { UsersService } from 'src/services/users.service';
import { UsersController } from 'src/conrrollers/users.controller';


@Module({
  imports: [KafkaModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
