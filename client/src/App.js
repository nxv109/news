import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/commons/Navbar";
import Footer from "./components/commons/Footer";

// auth
import WithAuth from "./WithAuth";

// ScrollToTop
import ScrollToTop from "./ScrollToTop";

import "./App.css";

// component lazy load
const Home = React.lazy(() => import("./scenes/home/Index"));
const Login = React.lazy(() => import("./scenes/account/Login"));
const Profile = React.lazy(() => import("./scenes/account/Profile"));
const Register = React.lazy(() =>
   import("./scenes/account/Register")
);
const Contact = React.lazy(() => import("./scenes/Contact"));
const NotFound = React.lazy(() => import("./scenes/404NotFound"));

// admin
const Journalist = React.lazy(() => import("./scenes/journalist"));
const Editor = React.lazy(() => import("./scenes/editor"));
const Sensor = React.lazy(() => import("./scenes/sensor"));
const Admin = React.lazy(() => import("./scenes/admin"));

// news page
const Category = React.lazy(() => import("./scenes/category"));
const Channel = React.lazy(() => import("./scenes/channel"));
const Detail = React.lazy(() => import("./scenes/detail"));

function App() {
   return (
	  <Router className="App">
		 <ScrollToTop />
		 <div className="container-fluid mt-6 mb-3 min-h-100vh">
			<Navbar />
			<React.Suspense
			   fallback={
				  <div className="main-loader">
					 <div className="loader"></div>
				  </div>
			   }
			>
			   <Switch>
				  <Route path="/" component={Home} exact />
				  <Route path="/contact" component={Contact} />
				  <Route
					 path="/admin"
					 component={() => WithAuth(Journalist, Editor, Sensor, Admin)}
				  />
				  <Route path="/login" component={Login} />
				  <Route path="/register" component={Register} />
				  <Route path="/profile" component={Profile} />
				  <Route path="/category/*/:id" component={Category} />
				  <Route path="/channel/*/:id" component={Channel} />
				  <Route path="/*/:id" component={Detail} />
				  <Route path="/*" component={NotFound} />
			   </Switch>
			</React.Suspense>
			<div></div>
		 </div>
		 <Footer />
	  </Router>
   );
}

export default App;
