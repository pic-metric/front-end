import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PicMetric from "./components/PicMetric";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import "./App.css";
import { Grommet } from 'grommet';
import { Breakpoint } from "react-socks";

const App = () => {
    const theme = {
      global: {
        font: {
        family: 'Segoe UI',
        size: '1.3rem'
        }
      }
    };
  
  return (
    <Breakpoint up>
      <Grommet theme={theme}>
        <Router>
          <div className="App">
           <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/login" ><Login /></Route>
            <Route path="/register"><Register /></Route>
            <PrivateRoute path="/profile"><div>Navbar</div><Profile /></PrivateRoute>
            <PrivateRoute path="/picmetric"><div>Navbar</div><PicMetric /></PrivateRoute>
           </Switch>
          </div>
        </Router>
      </Grommet>
     </Breakpoint>

  );
}

export default App;
