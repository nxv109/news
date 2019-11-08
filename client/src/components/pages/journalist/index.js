import React from "react";
import { Route, Switch } from "react-router-dom";
import NavbarRight from "./Navbar";
import Dashboard from "./Dashboard";
import AddNew from "./AddNew";
import New from "./New";
import Trash from "./Trash";
import Edit from "./Edit";

export default function Journalist() {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <NavbarRight />
        <div className="main-panel">
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route path="/admin/add-new" component={AddNew} />
            <Route path="/admin/news" component={New} />
            <Route path="/admin/trash" component={Trash} />
            <Route path="/admin/new/:id" component={Edit} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
