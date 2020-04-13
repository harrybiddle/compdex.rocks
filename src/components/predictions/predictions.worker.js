/* eslint-disable no-restricted-globals */

import { scenarios } from "../../common/bruteforce";
import { stages } from "../constants";

export function generateScenarios(predictionsProps) {
  const athleteKeys = Object.keys(predictionsProps.athletes);
  return Object.entries(
    scenarios(
      new Set(athleteKeys),
      predictionsProps.stages[stages.QUALIFICATION],
      predictionsProps.stages[stages.SPEED],
      predictionsProps.stages[stages.BOULDER],
      predictionsProps.stages[stages.LEAD]
    )
  ).map(([athleteKey, scenarios]) => ({
    ...predictionsProps.athletes[athleteKey],
    scenarios: scenarios
  }));
}
