import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarRight from "./Navbar";
import Dashboard from "./Dashboard";
import AddNews from "./AddNews";

export default function Journalist() {
  return (
    <Router>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <NavbarRight />
          <div className="main-panel">
            <Switch>
              <Route exact path="/admin" component={Dashboard} />
              <Route path="/journalist/add-news" component={AddNews} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
