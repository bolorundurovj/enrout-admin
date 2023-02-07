import {IPaginatedMetadata} from "./ipaginated-metadata";

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginatedMetadata
}
