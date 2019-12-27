import React from "react";
import "./App.css";
import Column from "../column/Column";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

// Next: https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback
class App extends React.Component {
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

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceColumn = this.state.columns[source.droppableId];
    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    sourceTaskIds.splice(source.index, 1); // remove source
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds
    };

    const destinationColumn = this.state.columns[destination.droppableId];
    const destinationTaskIds = Array.from(destinationColumn.taskIds);
    destinationTaskIds.splice(destination.index, 0, draggableId); // insert destination
    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: destinationTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [source.droppableId]: newSourceColumn,
        [destination.droppableId]: newDestinationColumn
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

export default App;
