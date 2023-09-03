import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import "./styles/index.css";
import SignupPage from "./pages/Signup";
import { Notification } from "./components/notification";
import { useSelector } from "react-redux";
import { useCheckMyAuthQuery } from "./app/services/authApi";
import { useEffect, useState } from "react";
import { FullScreenLoader } from "./components/loader";

function App() {
  const { isAuthenticated } = useSelector((state) => state.me);
  const { data, isLoading, error, isFetching } = useCheckMyAuthQuery();
  const [blankLoader, setBlankLoader] = useState(true);
  const [errState, setErrState] = useState(false);
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
            <Route path="/" element={<>Home</>} />
            <Route path="/login/user" element={<LoginPage role="user" />} />
            <Route path="/login/agent" element={<LoginPage role="agent" />} />
            <Route path="/register/user" element={<SignupPage role="user" />} />
            <Route
              path="/register/agent"
              element={<SignupPage role="agent" />}
            />
          </Routes>
        </BrowserRouter>
      )}

      <Notification />
    </>
  );
}

export default App;
