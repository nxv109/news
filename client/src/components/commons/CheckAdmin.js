import React from "react";
import { Link } from "react-router-dom";

export default function CheckAdmin(props) {
	return (
		<React.Fragment>
			{
              props.role === "admin" 
              ? (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      OPTIONS
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to="/admin" className="dropdown-item">
                        Dashboard
                      </Link>
                      <Link to="/admin/manage-members" className="dropdown-item">
                        Manage Members
                      </Link>
                      <Link to="/admin/manage-comments" className="dropdown-item">
                        Manage Comments
                      </Link>
                      <Link to="/admin/categories" className="dropdown-item">
                        Categories
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to="/admin/add-new-category" className="dropdown-item">
                        + Add new category
                      </Link>
                    </div>
                  </li>
                )
              : props.role === "journalist"
              	? (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      OPTIONS
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to="/admin" className="dropdown-item">
                        Dashboard
                      </Link>
                      <Link to="/admin/news" className="dropdown-item">
                        Manage News
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to="/admin/add-new" className="dropdown-item">
                        + Add a new
                      </Link>
                    </div>
                  </li>
                )
              	: props.role === "editor"
              		? (
		                  <li className="nav-item dropdown">
		                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                      OPTIONS
		                    </a>
		                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
		                      <Link to="/admin" className="dropdown-item">
		                        Dashboard
		                      </Link>
		                      <Link to="/admin/news" className="dropdown-item">
		                        News
		                      </Link>
		                    </div>
		                  </li>
		                )
              		: props.role === "sensor"
              			? (
		                  <li className="nav-item dropdown">
		                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                      OPTIONS
		                    </a>
		                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
		                      <Link to="/admin" className="dropdown-item">
		                        Dashboard
		                      </Link>
		                      <Link to="/admin/news" className="dropdown-item">
		                        News
		                      </Link>
		                    </div>
		                  </li>
		                )
              			: null
            }
		</React.Fragment>
	)
}