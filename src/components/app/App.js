import React from "react";
import Competition from "../competition/Competition";
import Splash from "../splash/Splash";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div
        style={{
          maxWidth: "768px",
          height: "100%",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Switch>
          <Route path="/comp">
            <Competition />
          </Route>
          <Route path="/">
            <Redirect to="/" />
            <Splash to="/comp" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
