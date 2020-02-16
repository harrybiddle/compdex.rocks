import React from "react";
import RidgelinePlot from "../ridgelineplot/RidgelinePlot";
import { arrayDifference } from "../../common/utils";
import { stages } from "../constants";
import { probabilities } from "../../common/bruteforce";
import { calculateCentreOfMass } from "../competition/Competition";
import { isEqual } from "lodash";

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

export default class Predictions extends React.Component {
  computationShouldProceed() {
    const allAthleteIds = Object.keys(this.props.athletes);
    const numberMissingAthletes = stage =>
      arrayDifference(allAthleteIds, this.props.stages[stage]).length;
    return (
      numberMissingAthletes(stages.QUALIFICATION) === 0 &&
      numberMissingAthletes(stages.SPEED) === 0 &&
      numberMissingAthletes(stages.BOULDER) < 2
    );
  }

  shouldComponentUpdate = nextProps => !isEqual(this.props, nextProps);

  render() {
    if (this.computationShouldProceed()) {
      return <RidgelinePlot {...ridgelinePlotProps(this.props)} />;
    } else {
      return <div>Finish some stages first</div>;
    }
  }
}
