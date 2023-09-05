import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import { Notification } from "./components/notification";
import { useCheckMyAuthQuery } from "./app/services/authApi";
import { useEffect, useState } from "react";
import { FullScreenLoader } from "./components/loader";
import { AuthRoutes } from "./routes/auth";
import { DashboardRoutes } from "./routes/dashboard";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

function App() {
  const { data, isLoading, error, isFetching } = useCheckMyAuthQuery();
  const [blankLoader, setBlankLoader] = useState(true);
  const [errState, setErrState] = useState(false);
  const { isAuthenticated, myData } = useSelector((state) => state.me);
  useEffect(() => {
    let success = data?.success;
    let notSuccess = error?.data?.success;
    if (isFetching) {
      setBlankLoader(true);
    } else if (!isFetching && (success === true || notSuccess === false)) {
      if (error?.data?.success === false) setErrState(false);
      else setErrState(true);
      setTimeout(() => {
        setBlankLoader(false);
      }, 2000);
    }
  }, [isFetching, data, error]);

  const getHome = () => {
    if (isAuthenticated && myData.isAgent) {
      return <Navigate replace to="/dashboard/agent/tickets" />;
    } else if (isAuthenticated && myData.isUser) {
      return <Navigate replace to="/dashboard/user/tickets" />;
    } else {
      return <Home />;
    }
  };

  return (
    <>
      {isLoading || isFetching || blankLoader ? (
        <>
          <img
            src="/images/login.jpg"
            style={{ display: "none" }}
            alt={"skeleton"}
          />

          <FullScreenLoader />
        </>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={getHome()} />
          </Routes>
          <AuthRoutes />
          <DashboardRoutes />
        </BrowserRouter>
      )}

      <Notification />
    </>
  );
}

export default App;
