import React from "react";
import Column from "../column/Column";
import { DragDropContext } from "react-beautiful-dnd";

class KnownResults extends React.Component {
  state = {
    tasks: {
      "task-1": { id: "task-1", content: "Adam Ondra" },
      "task-2": { id: "task-2", content: "Alex Megos" },
      "task-3": { id: "task-3", content: "Margo Hayes" }
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Speed Round",
        taskIds: ["task-1", "task-2"]
      },
      "column-2": {
        id: "column-2",
        title: "Isolation Zone",
        taskIds: ["task-3"]
      }
    },
    columnOrder: ["column-1", "column-2"]
  };

  duplicateColumn = columnId => {
    const column = this.state.columns[columnId];
    const taskIds = Array.from(column.taskIds);
    return {
      ...column,
      taskIds: taskIds
    };
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // remove droppable from source column
    const sourceColumn = this.duplicateColumn(source.droppableId);
    sourceColumn.taskIds.splice(source.index, 1);

    // insert droppable into target column
    const isReorder = source.droppableId === destination.droppableId;
    const destinationColumn = isReorder
      ? sourceColumn
      : this.duplicateColumn(destination.droppableId);
    destinationColumn.taskIds.splice(destination.index, 0, draggableId);

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
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

export default KnownResults;
