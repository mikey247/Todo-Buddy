import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/authContext";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={authCtx.isLoggedin ? <HomePage /> : <Navigate to="/auth" />}
        />

        {!authCtx.isLoggedin && <Route path="/auth" element={<AuthPage />} />}

        <Route
          path="/profile"
          element={
            authCtx.isLoggedin ? <UserProfile /> : <Navigate to="/auth" />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
