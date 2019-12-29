import React from "react";
import "./App.css";
import KnownResults from "../knownresults/KnownResults";
import Predictions from "../predictions/Predictions";

import update from "immutability-helper";

class App extends React.Component {
  state = {
    columns: {
      "column-1": {
        title: "Speed Round",
        athletes: [
          { id: "athlete-1", content: "Adam Ondra" },
          { id: "athlete-2", content: "Alex Megos" }
        ]
      },
      "column-2": {
        title: "Isolation Zone",
        athletes: [{ id: "athlete-3", content: "Margo Hayes" }]
      }
    },
    columnOrder: ["column-1", "column-2"]
  };

  onDragEnd = result => {
    const newState = newStateOnDragEnd(this.state, result);
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <Predictions />
        <KnownResults
          onDragEnd={this.onDragEnd}
          columns={this.state.columns}
          columnOrder={this.state.columnOrder}
        />
      </div>
    );
  }
}

export function newStateOnDragEnd(oldState, result) {
  const { destination, source } = result;
  if (!destination) return oldState;

  // fetch athlete
  const athlete = oldState.columns[source.droppableId].athletes[source.index];

  // remove athlete from source column
  let newState = oldState;
  newState = update(newState, {
    columns: {
      [source.droppableId]: {
        athletes: { $splice: [[source.index, 1]] }
      }
    }
  });

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
