function TaskFilter({onStatusChange}) {
  return (
    <div>
      <button onClick={() => onStatusChange(undefined)}>전체</button>
      <button onClick={() => onStatusChange("TODO")}>TODO</button>
      <button onClick={() => onStatusChange("IN_PROGRESS")}>IN_PROGRESS</button>
      <button onClick={() => onStatusChange("DONE")}>DONE</button>
    </div>
  );
}

export {TaskFilter};
