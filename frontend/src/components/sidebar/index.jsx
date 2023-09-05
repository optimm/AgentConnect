import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItemSingle, SideBar, SideBarLogo } from "./styles";
import { useLogoutMutation } from "../../app/services/authApi";
import { createNotification } from "../notification";
import { useDispatch } from "react-redux";
import { authenticateMe } from "../../features/meSlice";

const SideBarComp = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(2);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const setActiveTabByRoute = () => {
    const path = location.pathname;
    if (path === `/dashboard/${role}/tickets`) {
      setActiveTab(0);
    } else if (path === `/dashboard/${role}/tickets/assigned`) {
      setActiveTab(1);
    } else if (path === `/dashboard/${role}/tickets/my`) {
      setActiveTab(1);
    } else {
      setActiveTab(2);
    }
  };

  useEffect(() => {
    setActiveTabByRoute();
  }, [location]);

  const handleLogout = async () => {
    const { data: logoutData, error: logoutError } = await logout();
    if (logoutData?.success) {
      createNotification(logoutData?.msg || "Logged out", "info", 2000);
      dispatch(
        authenticateMe({
          isAuthenticated: false,
        })
      );
      navigate("/");
    } else {
      createNotification(
        logoutError?.data?.msg || "Something went wrong",
        "error",
        2000
      );
    }
  };

  return (
    <SideBar>
      <SideBarLogo>
        <span>b</span>ranch
      </SideBarLogo>
      <div className="menu-head">MENU ITEM</div>
      <div className="menu-items">
        <MenuItemSingle
          selected={activeTab === 0}
          onClick={() => {
            setActiveTab(0);
            navigate(`/dashboard/${role}/tickets`);
          }}
        >
          All Tickets
        </MenuItemSingle>

        {role === "agent" ? (
          <MenuItemSingle
            selected={activeTab === 1}
            onClick={() => {
              setActiveTab(1);
              navigate(`/dashboard/agent/tickets/assigned`);
            }}
          >
            Assigned Tickets
          </MenuItemSingle>
        ) : (
          <MenuItemSingle
            selected={activeTab === 1}
            onClick={() => {
              setActiveTab(1);
              navigate(`/dashboard/user/tickets/my`);
            }}
          >
            My Tickets
          </MenuItemSingle>
        )}

        <MenuItemSingle onClick={handleLogout}>Logout</MenuItemSingle>
      </div>
    </SideBar>
  );
};

export default SideBarComp;
