import React from "react";
import ReactDOM from "react-dom";
import Competition from "./Competition";
const props = require("./../../../public/state.json");

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Competition {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
