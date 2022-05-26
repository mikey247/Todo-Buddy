import { db } from "../../firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import classes from "./Reply.module.css";
import { useState } from "react";

import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const Reply = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(props.body);
  // const [isReplying, setIsReplying] = useState(false);
  // const [replies, setReplies] = useState([]);
  // const [isCommenting, setIsCommenting] = useState(false);

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

  return (
    <>
      <div className={classes.body}>
        <p>{props.body}</p>
      </div>

      {isEditing && (
        <div className={classes.actions}>
          <textarea type="text" value={newComment} onChange={handleChange} />
          <br /> <br />
          <button onClick={() => handleEdit(props.id, newComment)}>Save</button>
          <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
        </div>
      )}

      <>
        {!isEditing && (
          <div className={classes.actions}>
            <button onClick={() => setIsEditing(!isEditing)}>
              <FiEdit2 />
            </button>
            <button onClick={() => handleDelete(props.id)}>
              {" "}
              <AiFillDelete />
            </button>
            {/* <button onClick={handleCommenting}>
        {" "}
        <BiCommentCheck />
      </button> */}
          </div>
        )}
        {/* {isReplying && (
      <CommentForm
        parentId={props.id}
        action={"Reply"}
        done={isReplying}
        handleCommenting={handleCommenting}
      />
    )} */}
      </>
    </>
  );
};

export default Reply;
