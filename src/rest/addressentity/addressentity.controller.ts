import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetAddressBookEntityDto } from './dto/request/getAddressBookEntity.dto';
import {
  GetAddressBookEntitiesParamDto,
  GetAddressBookEntitiesDto,
} from './dto/request/getAddressBookEntities.dto';
import { UpdateAddressBookEntityDto } from './dto/request/updateAddressBookEntity.dto';
import { CreateAddressBookEntityDto } from './dto/request/createAddressBookEntity.dto';
import { DeleteAddressBookEntityDto } from './dto/request/deleteAddressBookEntity.dto';
import { AddressBookEntityService } from './addressbookentity.service';
import { AddressBookEntityModel } from './models/addressbookentity.model';
import { PaginatedDto } from '../decorators/paginated.dto';
import { AddressBookEntityDto } from './dto/response/addressBookEntity.dto';
import { ApiPaginatedResponse } from '../decorators/paginatedResponse.decorator';

@ApiTags('Address Entities')
@Controller('rest/address-book/:addressBookId/address-entity')
@ApiExtraModels(PaginatedDto)
@ApiExtraModels(AddressBookEntityDto)
export class AddressEntityController {
  constructor(
    private readonly addressBookEntityService: AddressBookEntityService,
  ) {}

  @Get()
  @ApiPaginatedResponse(AddressBookEntityDto)
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  public async getAddressBookEntities(
    @Param() param: GetAddressBookEntitiesParamDto,
    @Query() query: GetAddressBookEntitiesDto,
  ) {
    const { addressBookId } = param;
    const { take, skip } = query;
    const addressBookEntities =
      await this.addressBookEntityService.findAllAddressBookEntities(
        addressBookId,
        take,
        skip,
      );

    return addressBookEntities;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Address book entity was fetched successfully',
    type: AddressBookEntityDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Address Book entity not found' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  public async getAddressBookEntity(
    @Param() getAddressBookEntityDto: GetAddressBookEntityDto,
  ) {
    const { id, addressBookId } = getAddressBookEntityDto;
    const addressBookEntity =
      await this.addressBookEntityService.findAddressBookEntity(
        id,
        addressBookId,
      );
    return addressBookEntity;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Address Book Entity has been successfully created',
    type: AddressBookEntityDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiConflictResponse({
    description: 'Address Book was not found. Please contact an administrator',
  })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  public async createAddressBookEntity(
    @Param() param: GetAddressBookEntitiesParamDto,
    @Body() body: CreateAddressBookEntityDto,
  ) {
    const { addressBookId } = param;
    const { address, firstName, lastName, phoneNumber } = body;
    const addressBookEntity = new AddressBookEntityModel(
      address,
      firstName,
      lastName,
      phoneNumber,
      addressBookId,
      body.homeNumber,
      body.email,
    );

    const createdAddressBookEntity =
      await this.addressBookEntityService.createAddressBookEntity(
        addressBookEntity,
      );
    return createdAddressBookEntity;
  }

  @Patch()
  @ApiOkResponse({
    description: 'Address book entity has been successfully updated',
    type: AddressBookEntityDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Address Book Entity not found' })
  @ApiConflictResponse({
    description: 'Address Book was not found. Please contact an administrator',
  })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  public async updateAddressBookEntity(
    @Param() getAddressBookDto: GetAddressBookEntitiesParamDto,
    @Body() addressBookEntityUpdate: UpdateAddressBookEntityDto,
  ) {
    const { addressBookId } = getAddressBookDto;
    const updatedAddressBookEntity =
      await this.addressBookEntityService.updateAddressBookEntity(
        addressBookId,
        addressBookEntityUpdate,
      );
    return updatedAddressBookEntity;
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Address book entity has been successfully deleted',
    type: AddressBookEntityDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Address Book entity not found' })
  @ApiConflictResponse({
    description: 'Address Book was not found. Please contact an administrator',
  })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  public async deleteAddressBookEntity(
    @Param() deleteAddressBookEntityDto: DeleteAddressBookEntityDto,
  ) {
    const { addressBookId, id } = deleteAddressBookEntityDto;
    const deleteAddressBookEntity =
      await this.addressBookEntityService.deleteAdressBookEntity(
        addressBookId,
        id,
      );
    return deleteAddressBookEntity;
  }
}
