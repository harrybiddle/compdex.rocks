import React from "react";
import FetchedCompetition from "../fetchedcompetition/FetchedCompetition";
import Splash from "../splash/Splash";
import { ReactComponent as HomeIcon } from "./home.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import styles from "../common.module.css";
import lodash from "lodash";

export default function App() {
  return (
    <Router>
      <div
        style={{
          maxWidth: "768px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Switch>
          <Route path="/comp">
            <div style={{ display: "flex" }}>
              {/* Home */}
              <Link to="/">
                <HomeIcon />
              </Link>
            </div>
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
