import {ITask} from "../interfaces/ITask";
import * as styles from "./TaskCard.css.ts";

function TaskCard({task}: {task: ITask}) {
  return (
    <li className={styles.card}>
      <h2>{task.title}</h2>
      <p>{task.status}</p>
      <p>{task.priority}</p>
      <p>{task.assignee.name}</p>
      <p>{task.description}</p>
    </li>
  );
}

export default TaskCard;
