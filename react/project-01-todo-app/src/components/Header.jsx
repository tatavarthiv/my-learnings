import React from "react";

export default function Header(props) {
  const { todos } = props;
  const isTasksPlural = todos.length !== 1;
  return (
    <header>
      <h1 className="text-gradient">
        You have {todos.length} open {isTasksPlural ? "tasks" : "task"}.
      </h1>
    </header>
  );
}
