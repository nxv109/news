import React from "react";
import { Route, Switch } from "react-router-dom";
import NavbarRight from "./Navbar";
import Dashboard from "./Dashboard";
import AddNew from "./AddNew";
import News from "./News";
import Trash from "./Trash";

export default function Journalist() {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <NavbarRight />
        <div className="main-panel">
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route path="/admin/add-new" component={AddNew} />
            <Route path="/admin/news" component={News} />
            <Route path="/admin/trash" component={Trash} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
