import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default class DraggableAthlete extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.athlete.draggableId}
        index={this.props.index}
      >
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps} // make whole div draggable
            ref={provided.innerRef}
          >
            {this.props.athlete.content}
          </div>
        )}
      </Draggable>
    );
  }
}
