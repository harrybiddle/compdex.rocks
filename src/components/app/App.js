import React from "react";
import "./App.css";
import KnownResults from "../knownresults/KnownResults";
import Predictions from "../predictions/Predictions";

import update from "immutability-helper";

class App extends React.Component {
  state = {
    athletes: {
      athlete1: { name: "Adam Ondra" },
      athlete2: { name: "Alex Megos" },
      athlete3: { name: "Margo Hayes" }
    },
    speedRound: ["athlete1", "athlete2"],
    boulderRound: [],
    leadRound: []
  };

  render() {
    return (
      <div>
        <Predictions />
        <KnownResults
          onDragEnd={result =>
            this.setState(newStateOnDragEnd(this.state, result))
          }
          columns={constructColumns(this.state)}
          columnOrder={this.state.columnOrder}
        />
      </div>
    );
  }
}

export function constructColumns(state) {
  const { athletes, speedRound, boulderRound, leadRound } = state;
  const removeAll = (setA, setB) =>
    new Set([...setA].filter(x => !setB.has(x)));

  const constructAthletes = (athleteIds, prefix) =>
    athleteIds.map(id => ({
      id: prefix + "-" + id,
      content: athletes[id].name
    }));

  // put athletes in the isolation zone if the round has started
  const allAthleteIds = Object.keys(athletes);
  const isolationZoneAthletes = [];
  for (let round of [
    { athleteIds: speedRound, prefix: "speedRound" },
    { athleteIds: boulderRound, prefix: "boulderRound" },
    { athleteIds: leadRound, prefix: "leadRound" }
  ]) {
    const roundHasStarted = round.athleteIds.length > 0;
    if (roundHasStarted) {
      // remove the athletes that have competed, leaving those waiting
      const waitingAthleteIds = removeAll(
        allAthleteIds,
        new Set(round.athleteIds)
      );

      // construct draggables for athletes left
      for (let e of constructAthletes(
        Array.from(waitingAthleteIds),
        round.prefix
      )) {
        isolationZoneAthletes.push(e);
      }
    }
  }

  // construct rounds with known results
  return {
    speedRound: {
      title: "Speed Round",
      athletes: constructAthletes(speedRound, "speedRound")
    },
    boulderRound: {
      title: "Boulder Round",
      athletes: constructAthletes(boulderRound, "boulderRound")
    },
    leadRound: {
      title: "Lead Round",
      athletes: constructAthletes(leadRound, "leadRound")
    },
    isolationZone: {
      title: "Isolation Zone",
      athletes: isolationZoneAthletes
    }
  };
}

export function newStateOnDragEnd(oldState, result) {
  const { destination, source } = result;
  if (!destination) return oldState;

  // fetch athlete
  const athlete = oldState.columns[source.droppableId].athletes[source.index];

  // remove athlete from source column, if it is not the isolation zone
  let newState = oldState;
  if (source.droppableId !== "isolationZone") {
    newState = update(newState, {
      columns: {
        [source.droppableId]: {
          athletes: { $splice: [[source.index, 1]] }
        }
      }
    });
  }

  // insert athlete into target column
  newState = update(newState, {
    columns: {
      [destination.droppableId]: {
        athletes: { $splice: [[destination.index, 0, athlete]] }
      }
    }
  });

  return newState;
}

export default App;
