import { EntityState } from '@app/shared/models/EntityState';

export interface Paging {
  itemsPerPage: number;
  page: number;
  pageCount: number;
  totalItems: number;
}

export interface PaginatedResult<T> {
  data: EntityState<T>;
  meta: Paging;
}
