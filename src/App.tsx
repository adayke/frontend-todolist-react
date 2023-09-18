import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { TaskType, TodoList } from "./TodoList";

let tasks1: Array<TaskType> = [
  { id: 1, title: "CSS", isDone: true },
  { id: 1, title: "HTML", isDone: true },
  { id: 1, title: "JavaScript", isDone: true },
];

let tasks2: Array<TaskType> = [
  { id: 1, title: "Terminator", isDone: true },
  { id: 1, title: "Iron man", isDone: true },
  { id: 1, title: "Spider man", isDone: true },
];

function App() {
  return (
    <div className="App">
      <TodoList title="What to learn" tasks={tasks1} />
      <TodoList title="Movies to watch" tasks={tasks2} />
    </div>
  );
}

export default App;
