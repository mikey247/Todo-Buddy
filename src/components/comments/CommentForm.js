import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import classes from "./CommentForm.module.css";

const CommentForm = ({ parentId, action }) => {
  const [enteredComment, setEnteredComment] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setEnteredComment(e.target.value);
    console.log(enteredComment);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enteredComment !== "") {
      await addDoc(collection(db, "comments"), {
        comment: enteredComment,
        parent: parentId,
      });
      setEnteredComment("");
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={enteredComment}
        placeholder={
          action === "Reply" ? "Reply this comment" : "Leave a comment"
        }
      />
      <div className={classes.actions}>
        <button>{action}</button>
      </div>
    </form>
  );
};

export default CommentForm;
