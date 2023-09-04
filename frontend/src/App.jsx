import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import "./styles/index.css";
import SignupPage from "./pages/Signup";
import { Notification } from "./components/notification";
import { useSelector } from "react-redux";
import { useCheckMyAuthQuery } from "./app/services/authApi";
import { useEffect, useState } from "react";
import { FullScreenLoader } from "./components/loader";
import AllTicketsPage from "./pages/AllTickets";
import AssignedTicketsPage from "./pages/AssignedTickets";
import TicketDetailPage from "./pages/TicketDetail";
import SideBarAgent from "./components/sidebar/agent";
import { MainWrapper, MainWrapperRight } from "./styles/globalStyle";

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
          {/* auth routes */}
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

          {/* dashboard agent routes */}
          <MainWrapper>
            <SideBarAgent />
            <MainWrapperRight>
              <Routes>
                <Route
                  path="/dashboard/agent/tickets"
                  element={<AllTicketsPage />}
                />
                <Route
                  path="/dashboard/agent/tickets/assigned"
                  element={<AssignedTicketsPage />}
                />
                <Route
                  path="/dashboard/agent/tickets/:id"
                  element={<TicketDetailPage />}
                />
              </Routes>
            </MainWrapperRight>
          </MainWrapper>
        </BrowserRouter>
      )}

      <Notification />
    </>
  );
}

export default App;
