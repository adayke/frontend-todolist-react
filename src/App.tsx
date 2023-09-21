// Когда пишем старт вебпак собирает весь проект и запускает локально на компе на локалхосте. Вебпак запускает весь проект собирает все файлы и запускает бабель преобразовывает все файлы на джс файлы.

// Функция имеет право обратиться за пределами функции это называется замыкание.

import { useState } from "react";
import { v1 } from "uuid";
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

  function changeStatus(taskId: string, isDone: boolean) {
    let task = dataTasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...dataTasks]);
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
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
