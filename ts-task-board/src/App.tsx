import {useState} from "react";
import {TaskForm} from "./components/TaskForm";
import {TaskList} from "./components/TaskList";
import {TaskFilter} from "./components/TaskFilter";

function App() {
  const [status, setStatus] = useState(undefined);

  return (
    <div>
      <h1>TS Task Board</h1>
      <TaskList status={status} />
      <TaskFilter onStatusChange={setStatus} />
      <TaskForm />
    </div>
  );
}

export default App;
