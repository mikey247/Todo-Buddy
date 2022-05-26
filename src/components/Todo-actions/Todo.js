import React, { useContext, useState, useEffect } from "react";
import classes from "./Todo.module.css";
import AuthContext from "../../store/authContext";
import CommentForm from "../comments/CommentForm";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Comment from "../comments/Comment";
import { BsCheckLg } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { BiCommentCheck } from "react-icons/bi";

const Todo = ({ todo, toggleComplete, handleDelete, handleEdit }) => {
  console.log(todo);
  const [newTitle, setNewTitle] = useState(todo.title);
  const authCtx = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  const handleCommenting = () => {
    setIsCommenting(!isCommenting);
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
    });
    return () => unsub();

    // eslint-disable-next-line
  }, [todo.id]);

  console.log(comments);

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
          <BsCheckLg />
        </button>

        <button onClick={() => handleEdit(todo, newTitle)}>
          <FiEdit2 />
        </button>

        <button onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </button>

        <button onClick={handleCommenting}>
          <BiCommentCheck />
        </button>
      </div>

      <div className={classes.commentForm}>
        {isCommenting && (
          <CommentForm
            receiver={todo.creator}
            parentId={todo.id}
            action={"comment"}
            done={isCommenting}
            handleCommenting={handleCommenting}
          />
        )}
      </div>

      <h2 style={{ color: "wheat" }}>Comments</h2>
      {comments.map((comment) => (
        <Comment
          body={comment.comment}
          key={comment.id}
          id={comment.id}
          receiver={comment.replyingTo}
          sender={comment.sender}
        />
      ))}
    </div>
  );
};

export default Todo;
