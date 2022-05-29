import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/authContext";
import { useContext } from "react";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedin;
  const logoutHandler = authCtx.logout;
  const userEmail = authCtx.userEmail;

  return (
    <>
      <nav class={classes.navbar}>
        <Link to="/">
          <div className={classes.logo}>
            <h3>Todo Buddy</h3>
          </div>
        </Link>

        <ul class={classes.navLinks}>
          <input type="checkbox" id="checkbox_toggle" />
          <label for="checkbox_toggle" class={classes.hamburger}>
            &#9776;
          </label>

          <div class={classes.menu}>
            {!isLoggedIn && (
              <li>
                <Link to="/auth">Login</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <Link to="/profile">Hello, {userEmail}</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default MainNavigation;
