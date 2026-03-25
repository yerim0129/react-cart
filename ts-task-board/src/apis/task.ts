import {PagedResponse} from "../interfaces/IResponse";
import {ITask} from "../interfaces/ITask";

export async function fetchTasks(
  status?: string,
  page?: number
): Promise<PagedResponse<ITask>> {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (page) params.set("page", String(page));
  const res = await fetch(`/api/tasks?${params.toString()}`);
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

