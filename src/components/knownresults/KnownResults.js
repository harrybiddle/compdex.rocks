import React from "react";
import Column from "../column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import update from "immutability-helper";

export function newStateOnDragEnd(oldState, result) {
  console.log(result);

  const { destination, source, draggableId } = result;
  if (!destination) return oldState;

  // remove droppable from source column
  let newState = oldState;
  newState = update(newState, {
    columns: {
      [source.droppableId]: {
        athleteIds: { $splice: [[source.index, 1]] }
      }
    }
  });

  // insert droppable into target column
  newState = update(newState, {
    columns: {
      [destination.droppableId]: {
        athleteIds: { $splice: [[destination.index, 0, draggableId]] }
      }
    }
  });

  return newState;
}

class KnownResults extends React.Component {
  state = {
    athletes: {
      "athlete-1": { id: "athlete-1", content: "Adam Ondra" },
      "athlete-2": { id: "athlete-2", content: "Alex Megos" },
      "athlete-3": { id: "athlete-3", content: "Margo Hayes" }
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Speed Round",
        athleteIds: ["athlete-1", "athlete-2"]
      },
      "column-2": {
        id: "column-2",
        title: "Isolation Zone",
        athleteIds: ["athlete-3"]
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
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const athletes = column.athleteIds.map(
            athleteId => this.state.athletes[athleteId]
          );

          return <Column key={column.id} column={column} athletes={athletes} />;
        })}
      </DragDropContext>
    );
  }
}

export default KnownResults;
