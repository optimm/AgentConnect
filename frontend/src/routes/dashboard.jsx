import { useSelector } from "react-redux";
import { MainWrapper, MainWrapperRight } from "../styles/globalStyle";
import SideBarComp from "../components/sidebar";
import AllTicketsPage from "../pages/AllTickets";
import AssignedTicketsPage from "../pages/AssignedTickets";
import TicketDetailPage from "../pages/TicketDetail";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

export const DashboardRoutes = () => {
  const { myData, isAuthenticated } = useSelector((state) => state.me);
  const location = useLocation();

  const checkAuthentication = () => {
    if (!isAuthenticated) {
      return <Navigate replace to="/" />;
    }
    return null;
  };

  const handleUnauthorizedAccess = () => {
    if (!myData.isAgent && location.pathname.startsWith("/dashboard/agent")) {
      return <Navigate replace to="/dashboard/user/tickets" />;
    } else if (
      !myData.isUser &&
      location.pathname.startsWith("/dashboard/user")
    ) {
      return <Navigate replace to="/dashboard/user/tickets" />;
    }
  };

  const GetWrappedComponent = ({ componentToRender }) => {
    return (
      <MainWrapper>
        <SideBarComp role={myData.isAgent ? "agent" : "user"} />
        <MainWrapperRight>{componentToRender}</MainWrapperRight>
      </MainWrapper>
    );
  };

  const getDashboardRoute = () => {
    return (
      <Routes>
        {myData.isAgent ? (
          <Route
            path="/dashboard/agent/*"
            element={
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
            }
          />
        ) : (
          <Route
            path="/dashboard/user/*"
            element={
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
            }
          />
        )}
      </Routes>
    );
  };

  return (
    <>
      {checkAuthentication()}
      {handleUnauthorizedAccess()}
      {getDashboardRoute()}
    </>
  );
};
