import React from "react";
import ScenarioExplorerLoader from "../scenarioexplorerloader/ScenarioExplorerLoader";
import { allowedDegreesOfFreedom } from "../constants";

export function degreesOfFreedom(props) {
  const numAthletes = Object.keys(props.athletes).length;
  return Object.values(props.stages).reduce(
    (t, athletes) => t + numAthletes - athletes.length,
    0
  );
}

export default function ScenarioExplorerProtector(props) {
  if (degreesOfFreedom(props) < allowedDegreesOfFreedom) {
    return <ScenarioExplorerLoader {...props} />;
  } else {
    return (
      <div>
        You must place some more athletes before you can see the predictions!
      </div>
    );
  }
}
