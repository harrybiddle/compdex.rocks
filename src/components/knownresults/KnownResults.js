import React from "react";
import Column from "../column/Column";
import { DragDropContext } from "react-beautiful-dnd";

class KnownResults extends React.Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        {this.props.columnOrder.map(columnId => {
          const column = this.props.columns[columnId];
          return (
            <Column key={columnId} droppableId={columnId} column={column} />
          );
        })}
      </DragDropContext>
    );
  }
}

export default KnownResults;
