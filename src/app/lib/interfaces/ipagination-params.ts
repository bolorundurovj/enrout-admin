import {SortOrder} from "../enums";

export interface IPaginationParams {
  order: SortOrder;
  page: number;
  take: number;
  q?: string;
}
