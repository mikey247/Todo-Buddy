import { useState, useEffect, useContext } from "react";
import AddTodo from "../Todo-actions/AddTodo";
import AuthContext from "../../store/authContext";
import classes from "./StartingPageContent.module.css";
import Todo from "../Todo-actions/Todo";
import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      const filteredTodos = todosArray.filter(
        (todo) => todo.userId === authCtx.userId
      );
      setTodos(filteredTodos);
    });
    return () => unsub();
  }, [authCtx.userId]);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <section className={classes.starting}>
      <h1>To-Do or Not To-do</h1>
      <AddTodo />
      <div>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </section>
  );
};

export default StartingPageContent;
