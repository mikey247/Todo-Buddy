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
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Todo Buddy</div>
      </Link>
      <nav>
        <ul>
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
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
