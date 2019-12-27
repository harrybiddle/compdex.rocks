import React from "react";
import Column from "../column/Column";
import { DragDropContext } from "react-beautiful-dnd";

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

  duplicateColumn = columnId => {
    const column = this.state.columns[columnId];
    const athleteIds = Array.from(column.athleteIds);
    return {
      ...column,
      athleteIds: athleteIds
    };
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // remove droppable from source column
    const sourceColumn = this.duplicateColumn(source.droppableId);
    sourceColumn.athleteIds.splice(source.index, 1);

    // insert droppable into target column
    const isReorder = source.droppableId === destination.droppableId;
    const destinationColumn = isReorder
      ? sourceColumn
      : this.duplicateColumn(destination.droppableId);
    destinationColumn.athleteIds.splice(destination.index, 0, draggableId);

    // return updated state
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn
      }
    };
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
