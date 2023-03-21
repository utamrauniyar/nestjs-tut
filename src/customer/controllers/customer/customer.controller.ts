import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customer/dtos/createCustomer.dto';
import { CustomerService } from 'src/customer/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  /**
   * express js standard
   */
  @Get(':id')
  getCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = this.customerService.findCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({ msg: 'customer not found!' });
    }
  }

  /**
   * nest js standard
   */
  @Get('/search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customerService.findCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
  }

  @Get('')
  getAllCustomers() {
    return this.customerService.getCustomers();
  }

  @Post('create')
  @UsePipes(ValidationPipe) // is used to validate field whether how it should be passed like isstring, isempty or not
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto);
    this.customerService.createCustomer(createCustomerDto);
  }
}
