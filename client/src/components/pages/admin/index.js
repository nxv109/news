import React from "react";
import { Route, Switch } from "react-router-dom";
import NavbarRight from "./Navbar";
import Dashboard from "./Dashboard";
import Member from "./Member";
import Category from "./Category";
import Trash from "./Trash";
import AddNew from "./AddNew";
import Comment from "./Comment";

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
            <Route path="/admin/trash" component={Trash} />
            <Route path="/admin/add-new-category" component={AddNew} />
            <Route path="/admin/manage-comments" component={Comment} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
