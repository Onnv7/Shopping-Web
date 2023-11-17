import React from "react";
import "./rootlayout.scss";
import TopBar from "../../components/Shared/TopBar/TopBar";
import Home from "../../pages/Home/Home";
import { Outlet } from "react-router-dom";
const RootLayout: React.FC = () => {
  return (
    <div className="rootLayoutContainer">
      <TopBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
