import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedin: false,
  login: () => {},
  logout: () => {},
  userId: "",
  userEmail: "",
  isAdmin: false,
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialLocalId = localStorage.getItem("localId");
  const initialUserEmail = localStorage.getItem("userEmail");
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialLocalId);
  const [userEmail, setUserEmail] = useState(initialUserEmail);

  const userIsLoggedIn = !!token;
  const isAdmin = userId === "5GnNWvrN23P2Gv87aA6Vbo1ZYnx2";

  const loginHandler = (token, localId, email) => {
    setToken(token);
    localStorage.setItem("token", token);
    setUserId(localId);
    localStorage.setItem("localId", localId);
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  const logoutndler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    isLoggedin: userIsLoggedIn,
    login: loginHandler,
    logout: logoutndler,
    userId: userId,
    userEmail: userEmail,
    isAdmin: isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
