import {IPaginationParams} from "../interfaces";
import {SortOrder} from "../enums";

export class PaginationParams implements IPaginationParams {
  order = SortOrder.ASC;
  page = 1;
  take = 10;
  q?: string;
}
