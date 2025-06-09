import React, { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";

function App() {
  const [todos, setTodos] = useState([
    { input: "Hello! Add your first todo", completed: true },
    { input: "Learn React", completed: true },
    { input: "Build a Todo App", completed: false },
    { input: "Share it with the world", completed: false },
    { input: "Celebrate your success!", completed: false },
  ]);

  const [tab, setTab] = useState("Active");

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, completed: false }];
    setTodos(newTodoList);
  }

  function handleCompleteTodo(index) {
    const newTodoList = [...todos];
    newTodoList[index] = { ...todos[index], completed: true };
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodoList);
  }

  return (
    <>
      <Header todos={todos} />
      <Tabs todos={todos} selectedTab={tab} setSelectedTab={setTab} />
      <TodoList
        todos={todos}
        selectedTab={tab}
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
      <TodoInput handleAddTodo={handleAddTodo} />
    </>
  );
}

export default App;
