import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/commons/Navbar";

// component
import Home from "./components/pages/home/Index";
import Login from "./components/pages/account/Login";
import Profile from "./components/pages/account/Profile";
import Register from "./components/pages/account/Register";
import Contact from "./components/pages/contact";
import Footer from "./components/commons/Footer";
import NotFound from "./components/pages/404NotFound";

// admin
import Journalist from "./components/pages/journalist";
import Editor from "./components/pages/editor";

// auth
import WithAuth from "./WithAuth";

import "./App.css";

function App() {
  return (
    <Router className="App">
      <Navbar />
      <div className="container-fluid mt-7 mb-3">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={() => WithAuth(Journalist, Editor)} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
