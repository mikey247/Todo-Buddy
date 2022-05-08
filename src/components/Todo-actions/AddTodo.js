import { useState, useContext } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import classes from "./AddTodo.module.css";
import AuthContext from "../../store/authContext";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const authCtx = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
        userId: authCtx.userId,
      });
      setTitle("");
    }
  };

  return (
    <div className={classes.auth}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todos..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <div className={classes.actions}>
          <button>Add New Todo</button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
