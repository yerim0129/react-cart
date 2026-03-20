import {IBaseEntity} from "./IBaseEntity";
import {IUser} from "./IUser";
import {TaskStatus} from "../types/task";
import {TaskPriority} from "../types/task";

export interface ITask extends IBaseEntity {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: IUser;
  dueDate: Date;
}
