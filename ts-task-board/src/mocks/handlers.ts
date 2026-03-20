import {http, HttpResponse} from "msw";
import {ITask} from "../interfaces/ITask";

let tasks: ITask[] = [
  {
    id: "1",
    title: "MSW 핸들러 작성",
    description: "Mock API 핸들러를 작성한다",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignee: {id: "u1", name: "홍길동", email: "hong@test.com", role: "USER"},
    dueDate: new Date("2026-04-01"),
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-18"),
  },
  {
    id: "2",
    title: "TanStack Query 연결",
    description: "useQuery로 태스크 목록을 불러온다",
    status: "TODO",
    priority: "MEDIUM",
    assignee: {id: "u1", name: "홍길동", email: "hong@test.com", role: "USER"},
    dueDate: new Date("2026-04-10"),
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-18"),
  },
];

export const handlers = [
  // 목록 조회
  http.get("/api/tasks", ({request}) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");

    const filtered = status
      ? tasks.filter((t) => t.status === status)
      : tasks;

    return HttpResponse.json({
      data: filtered,
      total: filtered.length,
      page: 1,
      limit: 10,
    });
  }),

  // 단건 조회
  http.get("/api/tasks/:id", ({params}) => {
    const task = tasks.find((t) => t.id === params.id);
    if (!task) return new HttpResponse(null, {status: 404});
    return HttpResponse.json(task);
  }),

  // 생성
  http.post("/api/tasks", async ({request}) => {
    const body = (await request.json()) as Omit<
      ITask,
      "id" | "createdAt" | "updatedAt"
    >;
    const newTask: ITask = {
      ...body,
      id: String(Date.now()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(newTask);
    return HttpResponse.json(newTask, {status: 201});
  }),

  // 수정
  http.patch("/api/tasks/:id", async ({params, request}) => {
    const body = (await request.json()) as Partial<ITask>;
    tasks = tasks.map((t) =>
      t.id === params.id ? {...t, ...body, updatedAt: new Date()} : t,
    );
    const updated = tasks.find((t) => t.id === params.id);
    return HttpResponse.json(updated);
  }),

  // 삭제
  http.delete("/api/tasks/:id", ({params}) => {
    tasks = tasks.filter((t) => t.id !== params.id);
    return new HttpResponse(null, {status: 204});
  }),
];
