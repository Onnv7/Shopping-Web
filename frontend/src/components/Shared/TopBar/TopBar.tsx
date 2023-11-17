import React from "react";
import "./topbar.scss";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Link, useNavigate } from "react-router-dom";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { storageManager } from "../../../helper/storager";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    storageManager.clearAuth();
    navigate("/");
  };
  return (
    <div className="sidebarContainer">
      <div className="sidebarCategory">
        <Link to="/" className={`link`}>
          <h3 className="sidebarHomeItem">Home</h3>
        </Link>
      </div>
      <div className="sidebarIconOptions">
        {storageManager.getToken() && storageManager.getUserId() && (
          <div className="sidebarIcon" onClick={handleLogout}>
            <ExitToAppRoundedIcon style={{ width: 32, height: 32 }} />
          </div>
        )}
        <Link className="sidebarIcon link" to={"/history"}>
          <ListAltRoundedIcon style={{ width: 32, height: 32 }} />
        </Link>
        <Link className="sidebarIcon link" to={"/cart"}>
          <ShoppingCartRoundedIcon style={{ width: 32, height: 32 }} />
        </Link>

        <Link className="sidebarIcon link" to={"/profile"}>
          <PersonRoundedIcon style={{ width: 32, height: 32 }} />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
