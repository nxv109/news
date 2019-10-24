import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/commons/Navbar";

// component
import Home from "./components/pages/home/Index";
import Login from "./components/pages/account/Login";
import Register from "./components/pages/account/Register";
import Contact from "./components/pages/contact/Index";
import Footer from "./components/commons/Footer";

import "./App.css";

function App() {
  return (
    <Router className="App">
      <Navbar />
      <div className="container-fluid mt-3 mb-3">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
