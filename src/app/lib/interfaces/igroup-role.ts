import {StaffDesignation} from "../enums";

export interface IGroupRole {
  id: string;
  name: string;
  designation: StaffDesignation;
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}
