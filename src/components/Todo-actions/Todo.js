import React, { useState } from "react";
import classes from "./Todo.module.css";

const Todo = ({ todo, toggleComplete, handleDelete, handleEdit }) => {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  return (
    <div className={classes.auth}>
      <input
        className={todo.completed === true ? classes.complete : " "}
        type="text"
        value={todo.title === "" ? newTitle : todo.title}
        onChange={handleChange}
        disabled={todo.completed === true}
      />
      <div className={classes.actions}>
        <button onClick={() => toggleComplete(todo)}>
          {todo.completed === false ? "Mark complete" : "Mark incomplete"}
        </button>
        <button onClick={() => handleEdit(todo, newTitle)}> Edit</button>
        <button onClick={() => handleDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Todo;
