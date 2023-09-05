import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import { Notification } from "./components/notification";
import { useCheckMyAuthQuery } from "./app/services/authApi";
import { useEffect, useState } from "react";
import { FullScreenLoader } from "./components/loader";
import { AuthRoutes } from "./routes/auth";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { MainWrapper, MainWrapperRight } from "./styles/globalStyle";
import SideBarComp from "./components/sidebar";
import AllTicketsPage from "./pages/AllTickets";
import AssignedTicketsPage from "./pages/AssignedTickets";
import TicketDetailPage from "./pages/TicketDetail";
import MyTickets from "./pages/MyTickets";

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

  const GetWrappedComponent = ({ componentToRender }) => {
    return <MainWrapperRight>{componentToRender}</MainWrapperRight>;
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
          <img
            src="/images/landing.jpg"
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
          <Routes>
            <Route
              path="/dashboard/agent/*"
              element={
                <MainWrapper>
                  <SideBarComp role={"agent"} />
                  <Routes>
                    <Route
                      path="tickets"
                      element={
                        <GetWrappedComponent
                          componentToRender={<AllTicketsPage />}
                        />
                      }
                    />
                    <Route
                      path="tickets/assigned"
                      element={
                        <GetWrappedComponent
                          componentToRender={<AssignedTicketsPage />}
                        />
                      }
                    />
                    <Route
                      path="tickets/:id"
                      element={
                        <GetWrappedComponent
                          componentToRender={<TicketDetailPage />}
                        />
                      }
                    />
                  </Routes>
                </MainWrapper>
              }
            />
            <Route
              path="/dashboard/user/*"
              element={
                <MainWrapper>
                  <SideBarComp role={"user"} />
                  <Routes>
                    <Route
                      path="tickets"
                      element={
                        <GetWrappedComponent
                          componentToRender={<AllTicketsPage />}
                        />
                      }
                    />
                    <Route
                      path="tickets/my"
                      element={
                        <GetWrappedComponent
                          componentToRender={<MyTickets />}
                        />
                      }
                    />
                    <Route
                      path="tickets/:id"
                      element={
                        <GetWrappedComponent
                          componentToRender={<TicketDetailPage />}
                        />
                      }
                    />
                  </Routes>
                </MainWrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      )}

      <Notification />
    </>
  );
}

export default App;
