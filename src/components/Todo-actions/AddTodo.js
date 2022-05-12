import { useState, useContext } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import classes from "./AddTodo.module.css";
import AuthContext from "../../store/authContext";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const authCtx = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      // console.log(category);
      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
        userId: authCtx.userId,
        category: category,
        creator: authCtx.userEmail,
      });
      setTitle("");
    }
    setCategory("");
  };

  return (
    <div className={classes.auth}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <div className={classes.category}>
          <p>Enter Category:</p>
          <select
            onChange={(e) => {
              const selected = e.target.value;
              setCategory(selected);
              // console.log(category);
            }}
            value={category}
            required
          >
            <option value="">...</option>
            <option value="work">Work</option>
            <option value="family">Family</option>
            <option value="leisure">Lesiure</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={classes.actions}>
          <button>Add New Todo</button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
