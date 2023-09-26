// Когда пишем старт вебпак собирает весь проект и запускает локально на компе на локалхосте. Вебпак запускает весь проект собирает все файлы и запускает бабель преобразовывает все файлы на джс файлы.

// Функция имеет право обратиться за пределами функции это называется замыкание.

import { useState } from "react";
import { v1 } from "uuid";
import "./App.css";

import { TaskType, TodoList } from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const [filter, setFilter] = useState<FilterValuesType>("all");

  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "completed" },
    { id: todoListId2, title: "What to buy", filter: "active" },
  ]);

  const [tasksObjects, setTasks] = useState({
    [todoListId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "JavaScript", isDone: false },
      { id: v1(), title: "React", isDone: true },
    ],

    [todoListId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: false },
    ],
  });

  function removeTodoList(todoListId: string) {
    let filteredTodoLists = todolists.filter((tl) => tl.id !== todoListId);
    setTodolists(filteredTodoLists);
    delete tasksObjects[todoListId];
  }

  function removeTask(id: string, todoListId: string) {
    const tasks = tasksObjects[todoListId];
    const filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    tasksObjects[todoListId] = filteredTasks;
    setTasks({ ...tasksObjects });
  }

  function addTask(title: string, todoListId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObjects[todoListId];
    let newTasks = [newTask, ...tasks];
    tasksObjects[todoListId] = newTasks;
    setTasks({ ...tasksObjects });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObjects[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObjects });
    }
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todolists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodolists([...todolists]);
    }
  }

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodoList = tasksObjects[tl.id];

        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }

        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }

        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
