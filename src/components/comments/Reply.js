import { db } from "../../firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import classes from "./Reply.module.css";
import { useContext, useState } from "react";

import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import AuthContext from "../../store/authContext";
import { CgProfile } from "react-icons/cg";
import { BiUpvote, BiDownvote } from "react-icons/bi";

const Reply = (props) => {
  const ctx = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(props.body);
  // const [isReplying, setIsReplying] = useState(false);
  // const [replies, setReplies] = useState([]);
  // const [isCommenting, setIsCommenting] = useState(false);

  const handleVote = async (id, direction) => {
    if (direction === "upvote") {
      await updateDoc(doc(db, "comments", id), { upvotes: props.upvotes + 1 });
    } else {
      await updateDoc(doc(db, "comments", id), {
        downvotes: props.downvotes + 1,
      });
    }
  };

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
        <h3>
          <span>
            <CgProfile />
          </span>
          {props.sender}
        </h3>
        <p>
          <span style={{ color: "brown" }}>
            {ctx.userEmail === props.receiver ? "" : `@${props.receiver} `}
          </span>
          {props.body}
        </p>
        <div className={classes.votes}>
          <p onClick={() => handleVote(props.id, "upvote")}>
            {props.upvotes} Upvotes{" "}
            <span>
              <button>
                <BiUpvote />
              </button>
            </span>
          </p>
          <p onClick={() => handleVote(props.id, "downvote")}>
            {props.downvotes} Downvotes{" "}
            <span>
              {" "}
              <button>
                <BiDownvote />
              </button>
            </span>
          </p>
        </div>
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
