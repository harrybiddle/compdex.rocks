/* eslint-disable no-restricted-globals */

import { probabilities } from "../../common/bruteforce";
import { stages } from "../constants";

function calculateCentreOfMass(values) {
  return values.map((value, i) => value * i).reduce((a, b) => a + b, 0);
}

export function ridgelinePlotProps(predictionsProps) {
  const athletes = Object.keys(predictionsProps.athletes);
  let rows = Object.entries(
    probabilities(
      new Set(athletes),
      predictionsProps.stages[stages.QUALIFICATION],
      predictionsProps.stages[stages.SPEED],
      predictionsProps.stages[stages.BOULDER],
      predictionsProps.stages[stages.LEAD]
    )
  ).map(a => [predictionsProps.athletes[a[0]].name, a[1]]);
  rows.sort(
    (a, b) => calculateCentreOfMass(a[1]) - calculateCentreOfMass(b[1])
  );
  return {
    athletes: rows.map(r => r[0]),
    probabilities: rows.reduce((acc, value) => {
      acc[value[0]] = value[1];
      return acc;
    }, {})
  };
}
