import classes from "./Reply.module.css";
const Reply = (props) => {
  return (
    <div className={classes.body}>
      <p>{props.body}</p>
    </div>
  );
};

export default Reply;
