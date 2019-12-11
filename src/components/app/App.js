import React from "react";
import "./App.css";
import Column from "../column/Column";
import { DragDropContext } from "react-beautiful-dnd";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Feed the cat" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "to-do",
      taskIds: ["task-1", "task-2"]
    }
  },
  columnOrder: ["column-1"]
};

// Next: https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback
class App extends React.Component {
  state = initialData;

  onDragEnd = result => {};

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
