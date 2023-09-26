import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.keyCode === 13) {
      if (newTaskTitle.trim() !== "") {
        props.addTask(newTaskTitle.trim(), props.id);
        setNewTaskTitle("");
      } else {
        setError("Title is required");
      }
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  const onAllClickFilter = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickFilter = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickFilter = () => {
    props.changeFilter("completed", props.id);
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodoList}>x</button>
      </h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTaskTitle}
          onKeyUp={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">Field id required</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id, props.id);
          };

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
          };

          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                defaultChecked={task.isDone}
                onChange={onChangeHandler}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickFilter}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickFilter}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickFilter}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
