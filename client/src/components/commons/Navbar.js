import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [user, setUser] = React.useState({});
  const appState = useSelector(state => state);

  console.log("user navbar", appState.users.data);

  const userNameExist = sessionStorage.getItem("userName");
  const imageExist = sessionStorage.getItem("image");

  React.useEffect(() => {
    if (appState.users.data) {
      setUser(appState.users.data);
    }
  }, [appState.users.data]);

  const hanldLogout = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("image");

    localStorage.removeItem("auth-token");
    localStorage.removeItem("role");

    setUser(null);

    window.location.reload("/");
  };

  // console.log(user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#0">
        Logo
      </a>
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
              {user && userNameExist ? (
                <div className="account__avatar">
                  <img
                    src={`/uploads/${user.image || imageExist}`}
                    alt="avatar"
                  />
                </div>
              ) : (
                "Account"
              )}
            </a>
            {user && userNameExist ? (
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/profile">
                  Profiles
                </Link>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#0" onClick={hanldLogout}>
                  Logout
                </a>
              </div>
            ) : (
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/login">
                  Login
                </Link>
                <Link className="dropdown-item" to="/register">
                  Register
                </Link>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#0">
                  Something else here
                </a>
              </div>
            )}
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/login">
                Login
              </Link>
              <Link className="dropdown-item" to="/register">
                Register
              </Link>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#0">
                Something else here
              </a>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
