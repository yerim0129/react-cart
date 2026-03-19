import {IBaseEntity} from "./IBaseEntity";
import {IUser} from "./IUser";

export interface ITask extends IBaseEntity {
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "HIGH" | "MEDIUM" | "LOW";
  assignee: IUser;
  dueDate: Date;
}
