import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const onNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };
  const onAllClickFilter = () => {
    props.changeFilter("all");
  };
  const onActiveClickFilter = () => {
    props.changeFilter("active");
  };
  const onCompletedClickFilter = () => {
    props.changeFilter("completed");
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTaskTitle}
          onKeyUp={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id);
          };

          return (
            <li key={task.id}>
              <input type="checkbox" defaultChecked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickFilter}>All</button>
        <button onClick={onActiveClickFilter}>Active</button>
        <button onClick={onCompletedClickFilter}>Completed</button>
      </div>
    </div>
  );
}
