import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItemSingle, SideBar, SideBarLogo } from "./styles";

const SideBarComp = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(2);

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
      </div>
    </SideBar>
  );
};

export default SideBarComp;
