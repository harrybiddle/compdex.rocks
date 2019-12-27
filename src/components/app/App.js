import React from "react";
import "./App.css";
import KnownResults from "../knownresults/KnownResults";
import Predictions from "../predictions/Predictions";

class App extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Predictions />
        <KnownResults />
      </div>
    );
  }
}

export default App;
