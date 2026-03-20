//interfaces 를 상황에 맞게 잘라쓰는 것. 원본을 건드리지 않고 재사용이 가능하다.
import {ITask} from "../interfaces/ITask";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export type CreateTaskDto = Omit<ITask, "id" | "createdAt" | "updatedAt">; //ITask에서 3개를 뺀 타입
export type UpdateTaskDto = Partial<ITask>; // 모든 필드 선택사항으로
export type TaskSummary = Pick<ITask, "title" | "status">; //필드 골라서
