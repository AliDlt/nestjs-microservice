import { Module } from "@nestjs/common";
import { ClientProxyFactory, RmqOptions, Transport } from "@nestjs/microservices";
import { GatewayService } from "./gateway.service";
import { UserController } from "./user.controller";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    GatewayService,
    {
      provide: "USER_SERVICE",
      useFactory() {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ["amqp://localhost:5673"],
            queue: "user-service",
            queueOptions: {
              durable: false,
            },
          },
        } as RmqOptions);
      },
      inject: [],
    },
    {
      provide: "TOKEN_SERVICE",
      useFactory() {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ["amqp://localhost:5673"],
            queue: "token-service",
            queueOptions: {
              durable: false,
            },
          },
        } as RmqOptions);
      },
      inject: [],
    }
  ],
})
export class GatewayModule { }
