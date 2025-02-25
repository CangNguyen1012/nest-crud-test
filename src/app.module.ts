import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_crud_test'),
    UsersModule,
    AddressesModule,
  ],
})
export class AppModule {}
