import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/admin" className="nav-link" href="index.html">
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-home menu-icon" />
          </Link>
        </li>
        <li className="nav-item sidebar-actions">
          <span className="nav-link">
            <Link to="/admin/add-new" className="btn btn-block btn-lg btn-outline-danger mt-4 p-3">
              + Add a new
            </Link>
          </span>
        </li>
      </ul>
    </nav>
  );
}
