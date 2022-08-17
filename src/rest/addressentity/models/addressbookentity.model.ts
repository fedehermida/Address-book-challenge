export class AddressBookEntityModel {
  constructor(
    public readonly address: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phoneNumber: string,
    public readonly addressBookId: number,
    public readonly homeNumber?: string,
    public readonly email?: string,
  ) {}
}
