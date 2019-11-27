import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addUser } from "../../actions/user.action";
import { getCategories } from "../../actions/category.action";

import Search from "./Search";

export default function NavUser(props) {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const hanldLogout = () => {
    dispatch(addUser(null));

    sessionStorage.removeItem("userId");
    localStorage.removeItem("auth-token");
  };

  return (
    <nav style={{ zIndex: 1041 }} className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark shadow-sm py-0 px-2">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img width="100%" src="/Logo-news.png" alt="Logo news" />
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
                HOME <span className="sr-only">(current)</span>
              </Link>
            </li>
            {appState.categories.data
              ? appState.categories.data.map((item, index) => (
                  <li key={index} className="nav-item">
                    <Link className="nav-link" to={`/categories/${item._id}`}>
                      {item.name.toUpperCase()}
                    </Link>
                  </li>
                ))
              : null}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                CONTACT
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle account text-danger"
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
                      style={props.style}
                      src={`/uploads/users/${appState.users.data.image ||
                        "avatar-default.jpg"}`}
                      alt="avatar"
                    />
                  </div>
                ) : (
                  "ACCOUNT"
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

          <div>
            <button type="button" className="btn btn-sm btn-danger" data-toggle="modal" data-target="#exampleModal">
              <i className="mdi mdi-magnify" />
            </button>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <Search />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
