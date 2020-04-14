import React from "react";
import FetchedCompetition from "../fetchedcompetition/FetchedCompetition";
import Splash from "../splash/Splash";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

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
              {/* Home*/}
              <Link to="/">
                <svg
                  class="bi bi-house-door"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 1.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5H9.5a.5.5 0 01-.5-.5v-4H7v4a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M13 2.5V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Link>

              <div style={{ flexGrow: "1" }}></div>

              {/*"Live" (Clockwise arrow) */}
              <div>
                <svg
                  class="bi bi-arrow-clockwise"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="grey"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.17 6.706a5 5 0 017.103-3.16.5.5 0 10.454-.892A6 6 0 1013.455 5.5a.5.5 0 00-.91.417 5 5 0 11-9.375.789z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8.147.146a.5.5 0 01.707 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 11-.707-.708L10.293 3 8.147.854a.5.5 0 010-.708z"
                    clip-rule="evenodd"
                  />
                </svg>
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
