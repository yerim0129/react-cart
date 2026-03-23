import {useTaskList} from "../hooks/useTaskList";
import TaskCard from "./TaskCard";

export function TaskList({status}: {status?: string}) {
  const {tasks, isLoading, isError} = useTaskList(status);
  if (isLoading) return <div>로딩 중</div>;
  else if (isError) return <div>에러 발생</div>;
  return (
    <ul>
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ul>
  );
}
