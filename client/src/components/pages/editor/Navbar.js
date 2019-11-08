import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-home menu-icon" />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/news" className="nav-link">
            <span className="menu-title">News</span>
            <i className="mdi mdi-view-list menu-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
