import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PicMetric from "./components/PicMetric";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <PrivateRoute path="/profile"><Profile /></PrivateRoute>
          <PrivateRoute path="/picmetric"><PicMetric /></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
