import {ITask} from "../interfaces/ITask";

function TaskCard({task}: {task: ITask}) {
  return (
    <li>
      <h2>{task.title}</h2>
      <p>{task.status}</p>
      <p>{task.priority}</p>
      <p>{task.assignee.name}</p>
      <p>{task.description}</p>
    </li>
  );
}

export default TaskCard;
