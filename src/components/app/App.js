import React from "react";
import FetchedCompetition from "../fetchedcompetition/FetchedCompetition";
import Splash from "../splash/Splash";
import { ReactComponent as LiveIcon } from "./live.svg";
import { ReactComponent as HomeIcon } from "./home.svg";
import { ReactComponent as ChevronLeftIcon } from "./chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "./chevron-right.svg";
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

              {/* Back */}
              <div>
                <ChevronLeftIcon />
              </div>

              {/* Wizard-Style Indicator */}
              <div style={{ flexGrow: "1", display: "flex" }}>
                {lodash.range(25).map(i => (
                  <div key={"dotContainer" + i} className={styles.sliderCss}>
                    <span
                      className={[
                        styles.dot,
                        i > 20 ? "bg-light" : "bg-success"
                      ].join(" ")}
                    ></span>
                  </div>
                ))}
              </div>

              {/* Foward */}
              <div>
                <ChevronRightIcon />
              </div>

              {/*"Live" (Clockwise arrow) */}
              <div>
                <LiveIcon />
              </div>
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
