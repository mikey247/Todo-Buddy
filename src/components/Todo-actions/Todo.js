import React, { useContext, useState, useEffect } from "react";
import classes from "./Todo.module.css";
import AuthContext from "../../store/authContext";
import CommentForm from "../comments/CommentForm";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Comment from "../comments/Comment";

const Todo = ({ todo, toggleComplete, handleDelete, handleEdit }) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const authCtx = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "comments"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let commentsArray = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push({ ...doc.data(), id: doc.id });
      });
      let filteredComments = [];
      filteredComments = commentsArray.filter(
        (comment) => comment.parent === todo.id
      );
      setComments(filteredComments);
      console.log(comments);
    });
    return () => unsub();

    // eslint-disable-next-line
  }, [todo.id]);

  return (
    <div className={classes.auth}>
      <input
        className={todo.completed === true ? classes.complete : " "}
        type="text"
        value={todo.title === "" ? newTitle : todo.title}
        onChange={handleChange}
        disabled={todo.completed === true}
      />
      {authCtx.isAdmin === true && (
        <p className={classes.creatorText}>Created by:{todo.creator}</p>
      )}
      <div className={classes.actions}>
        <button onClick={() => toggleComplete(todo)}>
          {todo.completed === false ? "Mark complete" : "Mark incomplete"}
        </button>
        <button onClick={() => handleEdit(todo, newTitle)}> Edit</button>
        <button onClick={() => handleDelete(todo.id)}>Delete</button>
      </div>

      <h2>Comments</h2>

      <CommentForm parentId={todo.id} action={"comment"} />

      {comments.map((comment) => (
        <Comment body={comment.comment} key={comment.id} id={comment.id} />
      ))}
    </div>
  );
};

export default Todo;
