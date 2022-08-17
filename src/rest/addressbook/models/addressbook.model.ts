export class AddressBookModel {
  constructor(
    public readonly userName: string,
    public readonly active: boolean = true,
  ) {}
}
