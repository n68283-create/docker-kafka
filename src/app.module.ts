import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './module/kafka.module';
import { UsersModule } from './module/users.module';

@Module({
  imports: [KafkaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
