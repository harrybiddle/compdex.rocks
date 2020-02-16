import React from "react";
import Competition from "../competition/Competition";
import Splash from "../splash/Splash";
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
      <div style={{ height: "100%" }}>
        {this.state.splashScreen ? (
          <Splash onClick={() => this.clearSplash()} />
        ) : (
          <Competition />
        )}
      </div>
    );
  }
}
