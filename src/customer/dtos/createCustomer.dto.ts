import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './createAddress.dto';

export class CreateCustomerDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
