import React, {useState} from "react";
import {useCreateTask} from "../hooks/useCreateTask";

export function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {mutate, isPending} = useCreateTask();

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      title,
      description,
      status: "TODO",
      priority: "HIGH",
      dueDate: new Date(),
      assignee: {
        id: "u1",
        name: "John Doe",
        email: "test@test.com",
        role: "USER",
      },
    });
  };

  return (
    <form onSubmit={handleSumbit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? " 생성 중" : "생성"}
      </button>
    </form>
  );
}
