import {useQuery} from "@tanstack/react-query";
import {fetchTasks} from "../apis/task";
import TaskCard from "./TaskCard";

export function TaskList() {
  const {data, isLoading} = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  if (isLoading) return <div>로딩 중</div>;

  return (
    <ul>
      {data?.data.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ul>
  );
}
