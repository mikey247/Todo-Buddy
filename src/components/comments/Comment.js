import { db } from "../../firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import CommentForm from "./CommentForm";
import classes from "./Comment.module.css";

const Comment = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(props.body);
  const [isReplying, setIsReplying] = useState(false);
  const [replies, setReplies] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setNewComment(e.target.value);
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "comments", id));
  };
  const handleEdit = async (id, newComment) => {
    await updateDoc(doc(db, "comments", id), { comment: newComment });
    setIsEditing(false);
    setNewComment("");
  };

  useEffect(() => {
    const q = query(collection(db, "comments"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let repliesArray = [];
      querySnapshot.forEach((doc) => {
        repliesArray.push({ ...doc.data(), id: doc.id });
      });
      //   let filteredComments = [];
      const filteredReplies = repliesArray.filter(
        (comment) => comment.parent === props.id
      );
      setReplies(filteredReplies);
    });
    return () => unsub();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <p>{props.body}</p>

      {isEditing && (
        <div className={classes.actions}>
          <input type="text" value={newComment} onChange={handleChange} />
          <button onClick={() => handleEdit(props.id, newComment)}>Save</button>
          <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
        </div>
      )}

      {!isEditing && (
        <>
          <div className={classes.actions}>
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            <button onClick={() => handleDelete(props.id)}>Delete</button>
            <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
          </div>
          {isReplying && <CommentForm parentId={props.id} action={"Reply"} />}
        </>
      )}

      <div className={classes.replies}>
        <h3>Replies</h3>
        {replies.length > 0 &&
          "Replies" &&
          replies.map((reply) => (
            <Comment body={reply.comment} key={reply.id} id={reply.id} />
          ))}
      </div>
    </>
  );
};

export default Comment;
