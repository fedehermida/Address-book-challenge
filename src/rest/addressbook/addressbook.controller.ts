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
import { AddressbookService } from './addressbook.service';
import { GetAddressBooksDto } from './dto/request/getAddressBooks.dto';
import { GetAddressBookDto } from './dto/request/getAddressBook.dto';
import { CreateAddressBookDto } from './dto/request/createAddressBook.dto';
import { UpdateAddressBookDto } from './dto/request/updateAddressBook.dto';
import { DeleteAddressBookDto } from './dto/request/deleteAddressBook.dto';
import { AddressBookModel } from './models/addressbook.model';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddressBookDto } from './dto/response/addressBook.dto';
import { ApiPaginatedResponse } from '../decorators/paginatedResponse.decorator';
import { PaginatedDto } from '../decorators/paginated.dto';
import { AddressBookNotFound } from './errors/addressBookNotFound.error';
import { AddressBook } from '@prisma/client';
import { Pagination } from '../interfaces/pagination';

@ApiTags('Address Book')
@Controller('rest/address-book')
@ApiExtraModels(PaginatedDto)
@ApiExtraModels(AddressBookDto)
export class AddressbookController {
  constructor(private readonly addressBookService: AddressbookService) {}

  @Get()
  @ApiPaginatedResponse(AddressBookDto)
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  public async getAddressBooks(
    @Query() getAddressBooks: GetAddressBooksDto,
  ): Promise<Pagination<AddressBook[]>> {
    return await this.addressBookService.getAllAddressBook(
      getAddressBooks.skip,
      getAddressBooks.take,
    );
  }

  @ApiOkResponse({
    description: 'Address book was fetched successfully',
    type: AddressBookDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Address Book not found' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  @Get('/:id')
  public async getAddressBook(
    @Param() getAddressBook: GetAddressBookDto,
  ): Promise<AddressBook> {
    const fetchedUser = await this.addressBookService.getAddressBook(
      getAddressBook.id,
    );
    this.validateAddressBookOperationResult(fetchedUser);
    return fetchedUser;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Address Book has been successfully created',
    type: AddressBookDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  public async createAddressBook(
    @Body() createAddressBook: CreateAddressBookDto,
  ): Promise<AddressBook> {
    const addressBook = new AddressBookModel(createAddressBook.userName);
    const createdAddressBook = await this.addressBookService.createAddressBook(
      addressBook,
    );
    return createdAddressBook;
  }

  @Patch()
  @ApiOkResponse({
    description: 'Address book has been successfully updated',
    type: AddressBookDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Address Book not found' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  public async updateAddressBook(
    @Body() updateAddressBookDto: UpdateAddressBookDto,
  ): Promise<AddressBook> {
    const { id, userName } = updateAddressBookDto;
    const updateAddressBook = new AddressBookModel(userName);
    const updatedAddressBook = await this.addressBookService.updateAddressBook(
      id,
      updateAddressBook,
    );
    this.validateAddressBookOperationResult(updatedAddressBook);
    return updatedAddressBook;
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Address book has been successfully deleted',
    type: AddressBookDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiNotFoundResponse({ description: 'Address Book not found' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiServiceUnavailableResponse({ description: 'Database Error' })
  public async deleteAddressBook(
    @Param() deleteAddressBook: DeleteAddressBookDto,
  ): Promise<AddressBook> {
    const deletedAddressBook = await this.addressBookService.deleteAddressBook(
      deleteAddressBook.id,
    );
    this.validateAddressBookOperationResult(deletedAddressBook);
    return deletedAddressBook;
  }

  private validateAddressBookOperationResult(result) {
    if (!result) throw new AddressBookNotFound('Address Book not found');
    return;
  }
}
