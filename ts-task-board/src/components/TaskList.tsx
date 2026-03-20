import {useTaskList} from "../hooks/useTaskList";
import TaskCard from "./TaskCard";

export function TaskList({status}: {status?: string}) {
  const {tasks, isLoading} = useTaskList(status);
  if (isLoading) return <div>로딩 중</div>;

  return (
    <ul>
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ul>
  );
}
