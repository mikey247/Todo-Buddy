import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import AuthContext from "../../store/authContext";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBhRvU_uFcT5b3TbEZcYcjpTVLspD5zQiU",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      navigate("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength={"7"}
          ref={passwordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
