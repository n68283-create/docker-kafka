// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { Kafka, Producer, Consumer } from 'kafkajs';

// @Injectable()
// export class KafkaService implements OnModuleInit {
//   private kafka = new Kafka({
//     clientId: 'my-app',
//     brokers: ['localhost:9092'],
//   });

//   private producer: Producer;
//   private consumer: Consumer;

//   async onModuleInit() {
//     this.producer = this.kafka.producer();
//     await this.producer.connect();

//     this.consumer = this.kafka.consumer({ groupId: 'my-group' });
//     await this.consumer.connect();
//     await this.consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

//     await this.consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         console.log(`Received message: ${message.value?.toString()}`);
//       },
//     });
//   }

//   async sendMessage(topic: string, message: any) {
//     await this.producer.send({
//       topic,
//       messages: [{ value: JSON.stringify(message) }],
//     });
//   }
// }
