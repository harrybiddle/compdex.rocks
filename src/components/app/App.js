import React from "react";
import Competition from "../competition/Competition";
import Splash from "../splash/Splash";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import update from "immutability-helper";

export default class App extends React.Component {
  state = {
    splashScreen: true
  };

  clearSplash() {
    const newState = { splashScreen: { $set: false } };
    this.setState(update(this.state, newState));
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/comp">
            <Competition />
          </Route>
          <Route path="/">
            <Redirect to="/" />
            <Splash to="/comp" />
          </Route>
        </Switch>
      </Router>
    );
  }
}
