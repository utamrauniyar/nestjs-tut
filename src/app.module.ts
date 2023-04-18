import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import entities, { User } from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    CustomerModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tut_DB',
      entities,
      synchronize: true,
    }),
    AuthModule,
    PassportModule.register({ session: true }),
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
