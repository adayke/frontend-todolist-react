import React from "react";
import { useState } from "react";
import { v1 } from "uuid";
// import logo from "./logo.svg";
import "./App.css";

import { TaskType, TodoList } from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  const [dataTasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "HTML", isDone: false },
    { id: v1(), title: "JavaScript", isDone: false },
    { id: v1(), title: "React", isDone: true },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: string) {
    let filteredTasks = dataTasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...dataTasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = dataTasks;

  if (filter === "active") {
    tasksForTodoList = dataTasks.filter((t) => t.isDone === false);
  }

  if (filter === "completed") {
    tasksForTodoList = dataTasks.filter((t) => t.isDone === true);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
