import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { Address } from './schemas/address.schema';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Body() data: { [key: string]: any; user: string }) {
    return this.addressesService.create(data);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Address>) {
    return this.addressesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.addressesService.delete(id);
  }
}
