import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addUser } from "../../actions/user.action";

export default function NavAdmin() {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  const hanldLogout = () => {
    dispatch(addUser(null));

    sessionStorage.removeItem("userId");
    localStorage.removeItem("auth-token");
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-sm py-0 px-2">
        <Link to="/" className="navbar-brand">
          <img src="/Logo-news.png" alt="Logo news" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle account"
                href="#0"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {appState.users.data ? (
                  <div className="account__avatar">
                    <img
                      src={`/uploads/users/${appState.users.data.image ||
                        "avatar-default.jpg"}`}
                      alt="avatar"
                    />
                  </div>
                ) : (
                  "Account"
                )}
              </a>
              {appState.users.data ? (
                <div
                  className="dropdown-menu shadow"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/profile">
                    <i className="far fa-address-card mr-4"></i>
                    <span>Profile</span>
                  </Link>
                  <Link className="dropdown-item" to="/admin">
                    <i className="far fa-plus-square mr-4"></i>
                    <span>Admin</span>
                  </Link>
                  <div className="dropdown-divider" />
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={hanldLogout}
                  >
                    <i className="fas fa-sign-out-alt mr-4"></i>
                    <span>Logout</span>
                  </Link>
                </div>
              ) : (
                <div
                  className="dropdown-menu shadow"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/login">
                    <i className="fas fa-sign-in-alt mr-4"></i>
                    <span>Login</span>
                  </Link>
                  <Link className="dropdown-item" to="/register">
                    <i className="far fa-registered mr-4"></i>
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
    </nav>
  );
}
