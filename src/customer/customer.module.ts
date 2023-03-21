import { Module } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { CustomerController } from './controllers/customer/customer.controller';
import { ValidateCustomerMiddleware } from './middlewares/validCustomer.middeware';
import { CustomerService } from './services/customer/customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCustomerMiddleware)
      .exclude(
        { path: 'api/customer/create', method: RequestMethod.POST },
        { path: 'api/customer', method: RequestMethod.GET },
      )
      .forRoutes(CustomerController);
  }
}
