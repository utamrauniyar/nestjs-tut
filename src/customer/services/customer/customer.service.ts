import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customer/dtos/createCustomer.dto';
import { Customer } from 'src/customer/types/customer';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'sammy@gmail.com',
      name: 'Sammy Sammy',
    },
    {
      id: 2,
      email: 'danny@gmail.com',
      name: 'Danny Danny',
    },
    {
      id: 3,
      email: 'manny@gmail.com',
      name: 'Manny Manny',
    },
  ];

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }

  getCustomers() {
    return this.customers;
  }
}
