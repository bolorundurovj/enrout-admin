import {IWorkflowItem} from "./iworkflow-item";

export interface IWorkflowExtended {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  workflowItems: IWorkflowItem[];
}
