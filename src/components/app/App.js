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
  const constructItem = (athleteId, isRanked) => ({
    isRanked: isRanked,
    isDragDisabled: false,
    draggableId: stage + "-" + athleteId,
    athleteId: athleteId,
    content: state.athletes[athleteId].name
  });

  // create column with all ranked athletes
  const rankedAthleteIds = state[stage];
  let column = {
    title: stageTitle[stage],
    stage: "speed",
    items: rankedAthleteIds.map(athleteId => constructItem(athleteId, true))
  };

  // add an empty item
  column.items.push({
    isRanked: false,
    isDragDisabled: true,
    draggableId: stage + "-divider",
    athleteId: "divider",
    isDivider: true,
    content: "-----------"
  });

  // push all unranked athletes
  const allAthleteIds = Object.keys(state.athletes);
  allAthleteIds.forEach(athleteId => {
    const isRanked = rankedAthleteIds.includes(athleteId);
    if (!isRanked) {
      column.items.push(constructItem(athleteId, false));
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
          columns={constructColumns(this.state)}
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

function constructColumns(state) {
  return {
    [stage.QUALIFICATION]: constructColumn(state, stage.QUALIFICATION),
    [stage.SPEED]: constructColumn(state, stage.SPEED),
    [stage.BOULDER]: constructColumn(state, stage.BOULDER),
    [stage.LEAD]: constructColumn(state, stage.LEAD)
  };
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

export function newStateOnDragEnd(state, result) {
  console.log(result);

  // ignore drags with no destination
  const { destination, source } = result;
  if (!destination) return state;

  // ignore drags between stages
  const columns = constructColumns(state);
  if (source.droppableId !== destination.droppableId) {
    return state;
  }

  // do not allow the dividing line to be dragged
  const stage = source.droppableId;
  const column = columns[stage];
  let dividerIndex = column.items.findIndex(item => item.isDivider);
  if (source.index === dividerIndex) return state;

  // remove athlete from source, if they were already ranked
  const wasRanked = source.index < dividerIndex;
  if (wasRanked) {
    state = update(state, {
      [stage]: { $splice: [[source.index, 1]] }
    });
    dividerIndex--;
  }

  // insert athlete into destination, if they are now ranked
  const athleteId = column.items[source.index].athleteId;
  const willBeRanked = destination.index <= dividerIndex;
  console.log("willBeRanked" + willBeRanked);
  console.log("destination.index" + destination.index);
  console.log("dividerIndex" + dividerIndex);
  if (willBeRanked) {
    state = update(state, {
      [stage]: {
        $splice: [[destination.index, 0, athleteId]]
      }
    });
  }

  return state;
}

export default App;
