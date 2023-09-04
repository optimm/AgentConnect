import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MenuItemSingle, SideBar, SideBarLogo } from "./styles";

const SideBarComponent = () => {
  const location = useLocation();
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
          onClick={() => setActiveTab(0)}
        >
          All Tickets
        </MenuItemSingle>
        <MenuItemSingle
          selected={activeTab === 1}
          onClick={() => setActiveTab(1)}
        >
          Assigned Tickets
        </MenuItemSingle>
      </div>
    </SideBar>
  );
};

export default SideBarComponent;
