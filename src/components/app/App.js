import React from "react";
import "./App.css";
import Rankings from "../rankings/Rankings";
import Predictions from "../predictions/Predictions";

import update from "immutability-helper";
import { probabilities } from "../../common/bruteforce";

const zones = {
  QUALIFICATION: "qualification",
  SPEED: "speed",
  BOULDER: "boulder",
  LEAD: "lead",
  ISOLATION: "isolation"
};

class App extends React.Component {
  state = {
    athletes: {
      athlete1: { name: "Adam Ondra" },
      athlete2: { name: "Alex Megos" },
      athlete3: { name: "Margo Hayes" }
    },
    [zones.QUALIFICATION]: ["athlete1", "athlete2", "athlete3"],
    [zones.SPEED]: ["athlete1", "athlete2"],
    [zones.BOULDER]: [],
    [zones.LEAD]: []
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
            zones.SPEED,
            zones.BOULDER,
            zones.LEAD,
            zones.ISOLATION
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
        state[zones.QUALIFICATION],
        state[zones.SPEED],
        state[zones.BOULDER],
        state[zones.LEAD]
      )
    ).map(a => [state.athletes[a[0]].name].concat(a[1]))
  };
}

export function constructColumns(state) {
  const removeAll = (setA, setB) =>
    new Set([...setA].filter(x => !setB.has(x)));

  const constructAthletes = (athleteIds, zone) =>
    athleteIds.map(athleteId => ({
      draggableId: zone + "-" + athleteId,
      athleteId: athleteId,
      content: state.athletes[athleteId].name
    }));

  // put athletes in the isolation zone if the round has started
  const allAthleteIds = Object.keys(state.athletes);
  const isolationZoneAthletes = [];
  for (let round of [zones.SPEED, zones.BOULDER, zones.LEAD]) {
    const athleteIds = state[round];
    const roundHasStarted = round === zones.SPEED || athleteIds.length > 0;
    if (roundHasStarted) {
      // remove the athletes that have competed, leaving those waiting
      const waitingAthleteIds = removeAll(allAthleteIds, new Set(athleteIds));

      // construct draggables for athletes left
      for (let e of constructAthletes(Array.from(waitingAthleteIds), round)) {
        isolationZoneAthletes.push(e);
      }
    }
  }

  // construct rounds with known results
  return {
    [zones.SPEED]: {
      title: "Speed Round",
      zone: zones.SPEED,
      athletes: constructAthletes(state[zones.SPEED], zones.SPEED)
    },
    [zones.BOULDER]: {
      title: "Boulder Round",
      zone: zones.BOULDER,
      athletes: constructAthletes(state[zones.BOULDER], zones.BOULDER)
    },
    [zones.LEAD]: {
      title: "Lead Round",
      zone: zones.LEAD,
      athletes: constructAthletes(state[zones.LEAD], zones.LEAD)
    },
    [zones.ISOLATION]: {
      title: "Isolation Zone",
      zone: zones.ISOLATION,
      athletes: isolationZoneAthletes
    }
  };
}

export function newStateOnDragEnd(oldState, result) {
  const { destination, source } = result;
  if (!destination) return oldState;

  // only allow certain drags
  const columns = constructColumns(oldState);
  const sourceZone = columns[source.droppableId].zone;
  const destinationZone = columns[destination.droppableId].zone;
  const isReorder = sourceZone === destinationZone;
  const dragAllowed =
    isReorder ||
    sourceZone === zones.ISOLATION ||
    destinationZone === zones.ISOLATION;
  if (!dragAllowed) {
    return oldState;
  }

  // remove athlete from source, if it is not the isolation zone
  let newState = oldState;
  if (sourceZone !== zones.ISOLATION) {
    newState = update(newState, {
      [sourceZone]: { $splice: [[source.index, 1]] }
    });
  }

  // insert athlete into target, if it is not the isolation zone
  const athlete = columns[source.droppableId].athletes[source.index];
  if (destinationZone !== zones.ISOLATION) {
    newState = update(newState, {
      [destinationZone]: {
        $splice: [[destination.index, 0, athlete.athleteId]]
      }
    });
  }

  return newState;
}

export default App;
