import { Module } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { NextFunction, Request, Response } from 'express';
import { CustomerController } from './controllers/customer/customer.controller';
import { ValidateCustomerMiddleware } from './middlewares/validCustomer.middeware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validCustomerAccount.middleware';
import { CustomerService } from './services/customer/customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        // using multiple middleware
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('Last Middleware');
          next();
        },
      )
      .exclude(
        {
          path: 'api/customer/create',
          method: RequestMethod.POST,
        },
        {
          path: 'api/customer',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CustomerController);
  }
}
