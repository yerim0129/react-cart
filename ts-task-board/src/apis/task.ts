import {PagedResponse} from "../interfaces/IResponse";
import {ITask} from "../interfaces/ITask";

export async function fetchTasks(
  status?: string,
): Promise<PagedResponse<ITask>> {
  const res = await fetch(
    status ? `/api/tasks/?status=${status}` : `/api/tasks`,
  );
  const data = await res.json();
  return data;
}

export async function createTask(
  body: Omit<ITask, "id" | "createdAt" | "updatedAt">,
): Promise<ITask> {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
  });
  return res.json();
}
