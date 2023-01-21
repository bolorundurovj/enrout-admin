import {DivisionType} from "../enums";

export interface IGroup {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  division: DivisionType;
}
