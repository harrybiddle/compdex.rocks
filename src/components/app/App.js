import React from "react";
import FetchedCompetition from "../fetchedcompetition/FetchedCompetition";
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
            <FetchedCompetition />
          </Route>
          <Route path="/">
            <Redirect to="/" />
            <Splash to="/comp?q=state" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
