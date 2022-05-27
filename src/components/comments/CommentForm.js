import { useContext, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import classes from "./CommentForm.module.css";
import AuthContext from "../../store/authContext";

const CommentForm = ({
  parentId,
  action,
  done,
  handleCommenting,
  receiver,
}) => {
  const [enteredComment, setEnteredComment] = useState("");
  const ctx = useContext(AuthContext);

  const handleChange = (e) => {
    e.preventDefault();
    setEnteredComment(e.target.value);
    // console.log(enteredComment);
  };

  // const timeStamp = new Date();
  // console.log(timeStamp);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enteredComment !== "") {
      await addDoc(collection(db, "comments"), {
        comment: enteredComment,
        parent: parentId,
        sender: ctx.userEmail,
        replyingTo: receiver,
        createdAt: serverTimestamp(),
      });
      setEnteredComment("");
      handleCommenting();
      // console.log(done);
    }
  };

  return (
    <>
      {done === true && (
        <form action="" onSubmit={handleSubmit}>
          <div className={classes.commentBox}>
            <textarea
              name=""
              id=""
              cols="10"
              rows="10"
              onChange={handleChange}
              value={enteredComment}
              placeholder={
                action === "Reply" ? "Reply this comment" : "Leave a comment"
              }
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>{action}</button>
          </div>
        </form>
      )}
    </>
  );
};

export default CommentForm;
