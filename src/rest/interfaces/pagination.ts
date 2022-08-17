export interface Pagination<T extends Iterable<any>> {
  skip: number;
  take: number;
  data: T;
  total: number;
}
