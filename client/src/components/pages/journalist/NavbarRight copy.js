import React from "react";

export default function NavbarRight() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="nav-profile-image">
              <img src="assets/images/faces/face1.jpg" alt="profile" />
              <span className="login-status online" />
              {/*change to offline or busy as needed*/}
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">David Grey. H</span>
              <span className="text-secondary text-small">Project Manager</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="index.html">
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-home menu-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <span className="menu-title">Basic UI Elements</span>
            <i className="menu-arrow" />
            <i className="mdi mdi-crosshairs-gps menu-icon" />
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/buttons.html">
                  Buttons
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/ui-features/typography.html"
                >
                  Typography
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/icons/mdi.html">
            <span className="menu-title">Icons</span>
            <i className="mdi mdi-contacts menu-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/forms/basic_elements.html">
            <span className="menu-title">Forms</span>
            <i className="mdi mdi-format-list-bulleted menu-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/charts/chartjs.html">
            <span className="menu-title">Charts</span>
            <i className="mdi mdi-chart-bar menu-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/tables/basic-table.html">
            <span className="menu-title">Tables</span>
            <i className="mdi mdi-table-large menu-icon" />
          </a>
        </li>
        <li className="nav-item sidebar-actions">
          <span className="nav-link">
            <div className="border-bottom">
              <h6 className="font-weight-normal mb-3">Projects</h6>
            </div>
            <button className="btn btn-block btn-lg btn-gradient-primary mt-4">
              + Add a new
            </button>
            <div className="mt-4">
              <div className="border-bottom">
                <p className="text-secondary">Categories</p>
              </div>
            </div>
          </span>
        </li>
      </ul>
    </nav>
  );
}
