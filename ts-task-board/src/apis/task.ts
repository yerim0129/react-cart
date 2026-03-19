import {PagedResponse} from "../interfaces/IResponse";
import {ITask} from "../interfaces/ITask";

export async function fetchTasks(): Promise<PagedResponse<ITask>> {
  const res = await fetch("/api/tasks");
  const data = await res.json();
  return data;
}
