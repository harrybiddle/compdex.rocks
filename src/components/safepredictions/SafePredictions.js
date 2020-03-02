import React from "react";
import Predictions from "../predictions/Predictions";
import { allowedDegreesOfFreedom } from "../constants";

export function degreesOfFreedom(props) {
  const numAthletes = Object.keys(props.athletes).length;
  return Object.values(props.stages).reduce(
    (t, athletes) => t + numAthletes - athletes.length,
    0
  );
}

export default function SafePredictions(props) {
  if (degreesOfFreedom(props) < allowedDegreesOfFreedom) {
    return <Predictions {...props} />;
  } else {
    return (
      <div>
        You must place some more athletes before you can see the predictions!
      </div>
    );
  }
}
