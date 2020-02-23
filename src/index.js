import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App";
import * as serviceWorker from "./serviceWorker";
import HelloWorker from "./predictions.worker.js";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const helloWorker = new HelloWorker();
let messageCount = 0;

helloWorker.postMessage({ run: true });

helloWorker.onmessage = event => {
  if (event.data.status) {
    console.log("STATUS", event.data.status);
  }

  if (event.data.message) {
    messageCount += 1;
    console.log("MESSAGE", event.data.message);

    if (messageCount >= 5) {
      helloWorker.postMessage({ run: false });
    }
  }
};
