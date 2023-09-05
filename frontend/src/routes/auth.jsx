import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import { useSelector } from "react-redux";

export const AuthRoutes = () => {
  const { isAuthenticated, myData } = useSelector((state) => state.me);

  return (
    <Routes>
      <Route
        path="/login/user"
        element={
          !isAuthenticated ? (
            <LoginPage role="user" />
          ) : (
            <Navigate replace to={`/dashboard/${myData.role}/tickets`} />
          )
        }
      />
      <Route
        path="/login/agent"
        element={
          !isAuthenticated ? (
            <LoginPage role="agent" />
          ) : (
            <Navigate replace to={`/dashboard/${myData.role}/tickets`} />
          )
        }
      />
      <Route
        path="/register/user"
        element={
          !isAuthenticated ? (
            <SignupPage role="user" />
          ) : (
            <Navigate replace to={`/dashboard/${myData.role}/tickets`} />
          )
        }
      />

      <Route
        path="/register/agent"
        element={
          !isAuthenticated ? (
            <SignupPage role="agent" />
          ) : (
            <Navigate replace to={`/dashboard/${myData.role}/tickets`} />
          )
        }
      />
    </Routes>
  );
};
