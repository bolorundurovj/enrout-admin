import {IGroupRole} from "./igroup-role";

export interface IWorkflowItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  position: number;
  workflowId: string;
  groupRoleId: string;
  groupRole: IGroupRole;
}
