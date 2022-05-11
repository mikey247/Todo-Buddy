import { useState, useEffect } from "react";
import Todo from "../Todo-actions/Todo";
import classes from "./Todo-List.module.css";

const TodoList = ({ todos, handleDelete, handleEdit, toggleComplete }) => {
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredTodos(todos);
    } else {
      const filteredArray = todos.filter((todo) => todo.category === filter);
      setFilteredTodos(filteredArray);
    }
  }, [filter, todos]);

  return (
    <>
      <div className={classes.category}>
        <select
          onChange={(e) => {
            const selected = e.target.value;
            setFilter(selected);
            console.log(filter);
          }}
        >
          <option value="all">All</option>
          <option value="work">Work</option>
          <option value="family">Family</option>
          <option value="leisure">Lesiure</option>
          <option value="other">Other</option>
        </select>
      </div>
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </>
  );
};

export default TodoList;
