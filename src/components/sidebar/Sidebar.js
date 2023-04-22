import React from "react";
import "./sidebar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
  } from "@mui/icons-material";
  import CategoryIcon from '@mui/icons-material/Category';
  import { Link } from "react-router-dom";

export default function Topbar() {
  return (
  <div>
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
      </div>
  </div>
</div>
    
   

<div  style={{width:200}} className="sidebar">
<div className="sidebarWrapper">
  <div className="sidebarMenu">
    <h3 className="sidebarTitle">Dashboard</h3>
    <ul className="sidebarList">
      <Link to="/" className="link">
      <li className="sidebarListItem active">
        <LineStyle className="sidebarIcon" />
        Home
      </li>
      </Link>
      <li className="sidebarListItem">
        <Timeline className="sidebarIcon" />
        Analytics
      </li>
      <li className="sidebarListItem">
        <TrendingUp className="sidebarIcon" />
        Sales
      </li>
    </ul>
  </div>
  <div className="sidebarMenu">
    <h3 className="sidebarTitle">Quick Menu</h3>
    <ul className="sidebarList">
      <Link to="/userlist" className="link">
        <li className="sidebarListItem">
          <PermIdentity className="sidebarIcon" />
          Users
        </li>
      </Link>
      <Link to="/products" className="link">
        <li className="sidebarListItem">
          <Storefront className="sidebarIcon" />
          Products
        </li>
      </Link>
      <Link to="/categories" className="link">
        <li className="sidebarListItem">
          < CategoryIcon className="sidebarIcon" />
          Categories
        </li>
      </Link>
      <li className="sidebarListItem">
        <AttachMoney className="sidebarIcon" />
        Transactions
      </li>
      <li className="sidebarListItem">
        <BarChart className="sidebarIcon" />
        Reports
      </li>
    </ul>
  </div>
  <div className="sidebarMenu">
    <h3 className="sidebarTitle">Notifications</h3>
    <ul className="sidebarList">
      <li className="sidebarListItem">
        <MailOutline className="sidebarIcon" />
        Mail
      </li>
      <li className="sidebarListItem">
        <DynamicFeed className="sidebarIcon" />
        Feedback
      </li>
      <li className="sidebarListItem">
        <ChatBubbleOutline className="sidebarIcon" />
        Messages
      </li>
    </ul>
  </div>
  <div className="sidebarMenu">
    <h3 className="sidebarTitle">Staff</h3>
    <ul className="sidebarList">
      <li className="sidebarListItem">
        <WorkOutline className="sidebarIcon" />
        Manage
      </li>
      <li className="sidebarListItem">
        <Timeline className="sidebarIcon" />
        Analytics
      </li>
      <li className="sidebarListItem">
        <Report className="sidebarIcon" />
        Reports
      </li>
    </ul>
  </div>
  </div>
 </div>
  
</div>


);
}

