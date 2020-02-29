import React from "react";
import Predictions from "../predictions/Predictions";

export function degreesOfFreedom(props) {
  const numAthletes = Object.keys(props.athletes).length;
  return Object.values(props.stages).reduce(
    (t, athletes) => t + numAthletes - athletes.length,
    0
  );
}

export default function SafePredictions(props) {
  if (degreesOfFreedom(props) < 8) {
    return <Predictions {...props} />;
  } else {
    return <div>Fill out more</div>;
  }
}
