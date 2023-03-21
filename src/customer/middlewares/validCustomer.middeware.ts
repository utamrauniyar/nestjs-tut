import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('hello, world!. I am inside validacustomerMiddleware');
    const { authorization } = req.headers;
    if (!authorization)
      return res
        .status(403)
        .send({ error: 'No Authentication token Provided' });
    next();
  }
}
