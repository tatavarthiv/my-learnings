import React from "react";
import TodoCard from "./TodoCard";

export default function TodoList(props) {
  const { todos, selectedTab } = props;

  const filteredTodos =
    selectedTab === "All"
      ? todos
      : selectedTab === "Active"
      ? todos.filter((val) => !val.completed)
      : todos.filter((val) => val.completed);
  return (
    <>
      {filteredTodos.map((todo) => {
        const originalIndex = todos.indexOf(todo);
        return (
          <TodoCard
            key={originalIndex}
            todo={todo}
            todoIndex={originalIndex}
            {...props}
          />
        );
      })}
    </>
  );
}
