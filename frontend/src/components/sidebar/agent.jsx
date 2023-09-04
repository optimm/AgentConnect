import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItemSingle, SideBar, SideBarLogo } from "./styles";

const SideBarAgent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const setActiveTabByRoute = () => {
    const path = location.pathname;
    if (path === "/dashboard/agent/tickets") {
      setActiveTab(0);
    } else if (path === "/dashboard/agent/tickets/assigned") {
      setActiveTab(1);
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
            navigate("dashboard/agent/tickets");
          }}
        >
          All Tickets
        </MenuItemSingle>
        <MenuItemSingle
          selected={activeTab === 1}
          onClick={() => {
            setActiveTab(1);
            navigate("dashboard/agent/tickets/assigned");
          }}
        >
          Assigned Tickets
        </MenuItemSingle>
      </div>
    </SideBar>
  );
};

export default SideBarAgent;
