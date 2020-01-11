import React from "react";
import RidgelinePlot from "../ridgelineplot/RidgelinePlot";
import { arrayDifference } from "../../common/utils";
import { stages } from "../constants";
import { probabilities } from "../../common/bruteforce";
import { calculateCentreOfMass } from "../app/App";
import { isEqual } from "lodash";

export function heatmapProps(predictionsProps) {
  function* headers(length) {
    yield "";
    yield "1st";
    yield "2nd";
    yield "3rd";
    let i = 4;
    while (i < length) {
      yield i + "th";
      i++;
    }
  }

  const athletes = Object.keys(predictionsProps.athletes);
  let rows = Object.entries(
    probabilities(
      new Set(athletes),
      predictionsProps.stages[stages.QUALIFICATION],
      predictionsProps.stages[stages.SPEED],
      predictionsProps.stages[stages.BOULDER],
      predictionsProps.stages[stages.LEAD]
    )
  ).map(a => [predictionsProps.athletes[a[0]].name].concat(a[1]));
  rows.sort(
    (a, b) =>
      calculateCentreOfMass(a.slice(1)) - calculateCentreOfMass(b.slice(1))
  );
  return {
    columns: Array.from(headers(athletes.length + 1)),
    rows: rows
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
      return <RidgelinePlot {...heatmapProps(this.props)} />;
    } else {
      return <div>Finish some stages first</div>;
    }
  }
}
