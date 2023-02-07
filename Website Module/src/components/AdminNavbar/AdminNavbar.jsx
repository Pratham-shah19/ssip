import React from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar-container">
      <div className="admin-nav-left">
        <div className="admin-title">
          <h3>Admin Panel</h3>
        </div>
        <div className="admin-nav-tags">
          <ul>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/admin-dashboard"
            >
              <li>Home</li>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/admin-dashboard/register"
            >
              <li>Register</li>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/admin-dashboard/Payment"
            >
              <li>Pay</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="admin-nav-right">
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/admin-dashboard/profile"
        >
          <h3>Admin Name</h3>
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
