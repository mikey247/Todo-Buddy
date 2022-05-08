import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedin: false,
  login: () => {},
  logout: () => {},
  userId: "",
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialLocalId = localStorage.getItem("localId");
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialLocalId);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, localId) => {
    setToken(token);
    localStorage.setItem("token", token);
    setUserId(localId);
    localStorage.setItem("localId", localId);
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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
