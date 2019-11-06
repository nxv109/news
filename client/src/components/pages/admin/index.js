import React from "react";
import { Route, Switch } from "react-router-dom";
import NavbarRight from "./Navbar";
import Dashboard from "./Dashboard";
import Member from "./Member";
import Category from "./Category";
import AddNew from "./AddNew";

export default function Admin() {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <NavbarRight />
        <div className="main-panel">
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route path="/admin/manage-members" component={Member} />
            <Route path="/admin/categories" component={Category} />
            <Route path="/admin/add-new-category" component={AddNew} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
