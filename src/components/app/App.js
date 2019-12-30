import React from "react";
import "./App.css";
import Rankings from "../rankings/Rankings";
import Predictions from "../predictions/Predictions";

import update from "immutability-helper";
import { probabilities } from "../../common/bruteforce";

const stage = {
  QUALIFICATION: "qualification",
  SPEED: "speed",
  BOULDER: "boulder",
  LEAD: "lead"
};

const stageTitle = {
  [stage.QUALIFICATION]: "Qualification",
  [stage.SPEED]: "Speed Stage",
  [stage.BOULDER]: "Boulder Stage",
  [stage.LEAD]: "Lead Stage"
};

export function constructColumn(state, stage) {
  const constructDraggable = athleteId => ({
    draggable: true,
    draggableId: stage + "-" + athleteId,
    athleteId: athleteId,
    content: state.athletes[athleteId].name
  });

  // create column with all ranked athletes
  const rankedAthleteIds = state[stage];
  let column = {
    title: stageTitle[stage],
    stage: "speed",
    athletes: rankedAthleteIds.map(constructDraggable)
  };

  // push the dividing line
  column.athletes.push({
    isDividingLine: true,
    draggable: false,
    content: "----------------"
  });

  // push all unranked athletes
  const allAthleteIds = Object.keys(state.athletes);
  allAthleteIds.map(athleteId => {
    const isRanked = rankedAthleteIds.includes(athleteId);
    if (!isRanked) {
      column.athletes.push(constructDraggable(athleteId));
    }
  });
  return column;
}

class App extends React.Component {
  state = {
    athletes: {
      athlete1: { name: "Adam Ondra" },
      athlete2: { name: "Alex Megos" },
      athlete3: { name: "Margo Hayes" }
    },
    [stage.QUALIFICATION]: ["athlete1", "athlete2", "athlete3"],
    [stage.SPEED]: ["athlete1", "athlete2"],
    [stage.BOULDER]: [],
    [stage.LEAD]: []
  };

  render() {
    return (
      <div>
        <Predictions {...predictionsProps(this.state)} />
        <Rankings
          onDragEnd={result =>
            this.setState(newStateOnDragEnd(this.state, result))
          }
          columns={{
            [stage.QUALIFICATION]: constructColumn(
              this.state,
              stage.QUALIFICATION
            ),
            [stage.SPEED]: constructColumn(this.state, stage.SPEED),
            [stage.BOULDER]: constructColumn(this.state, stage.BOULDER),
            [stage.LEAD]: constructColumn(this.state, stage.LEAD)
          }}
          columnOrder={[
            stage.QUALIFICATION,
            stage.SPEED,
            stage.BOULDER,
            stage.LEAD
          ]}
        />
      </div>
    );
  }
}

export function predictionsProps(state) {
  function* headers(length) {
    yield "1st";
    yield "2nd";
    yield "3rd";
    let i = 4;
    while (i < length) {
      yield i + "th";
      i++;
    }
  }
  const athletes = Object.keys(state.athletes);
  return {
    columns: ["athlete"].concat(Array.from(headers(athletes.length))),
    rows: Object.entries(
      probabilities(
        new Set(athletes),
        state[stage.QUALIFICATION],
        state[stage.SPEED],
        state[stage.BOULDER],
        state[stage.LEAD]
      )
    ).map(a => [state.athletes[a[0]].name].concat(a[1]))
  };
}

export function rankingsProps(state) {
  return;
}

export function newStateOnDragEnd(oldState, result) {
  const { destination, source } = result;
  if (!destination) return oldState;

  // only allow certain drags
  const columns = rankingsProps(oldState);
  const sourceStage = columns[source.droppableId].stage;
  const destinationStage = columns[destination.droppableId].stage;
  const isReorder = sourceStage === destinationStage;
  const dragAllowed =
    isReorder ||
    sourceStage === stage.ISOLATION ||
    destinationStage === stage.ISOLATION;
  if (!dragAllowed) {
    return oldState;
  }

  // remove athlete from source, if it is not the isolation stage
  let newState = oldState;
  if (sourceStage !== stage.ISOLATION) {
    newState = update(newState, {
      [sourceStage]: { $splice: [[source.index, 1]] }
    });
  }

  // insert athlete into target, if it is not the isolation stage
  const athlete = columns[source.droppableId].athletes[source.index];
  if (destinationStage !== stage.ISOLATION) {
    newState = update(newState, {
      [destinationStage]: {
        $splice: [[destination.index, 0, athlete.athleteId]]
      }
    });
  }

  return newState;
}

export default App;
